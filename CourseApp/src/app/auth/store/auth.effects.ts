import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { environment } from '../../../environments/environment';
import { AuthService } from "../auth.service";
import { User } from "../user.model";

import * as AuthActions from "./auth.actions";

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

const handleAuthentication = (expiresIn: number, email: string, userId: string, token: string) => {
    const expDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, userId, token, expDate)
    localStorage.setItem('userData', JSON.stringify(user));
    return new AuthActions.
        AuthenticateSuccess({
            email: email,
            userId: userId,
            token: token,
            expirationDate: expDate,
            redirect: true
        })
}
const handleError = (errorRes: any) => {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
        return of(new AuthActions.AuthenticateFail(errorMessage));
    }
    switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already!';
            break;
        case 'EMAIL_NOT_FOUND':
        case 'INVALID_PASSWORD':
            errorMessage = 'Wrong username or password! ';
            break;
    }
    return of(new AuthActions.AuthenticateFail(errorMessage));
}

@Injectable()
export class AuthEffects {

    constructor(private actions$: Actions, private http: HttpClient, private router: Router, private authService: AuthService) { }

    authSignup$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(AuthActions.SIGNUP_START),
                switchMap((signupAction: AuthActions.SignupStart) => {
                    return this.http.post<AuthResponseData>(
                        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
                        {
                            email: signupAction.payload.email,
                            password: signupAction.payload.password,
                            returnSecureToken: true,
                        }
                    ).pipe(
                        tap(resData => {
                            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                        }),
                        map(resData => handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken)),
                        catchError((errorRes) => handleError(errorRes)),
                    )
                })
            )
    )

    authLogin$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(AuthActions.LOGIN_START),
                switchMap((loginAction: AuthActions.LoginStart) => {
                    return this.http
                        .post<AuthResponseData>
                        (
                            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
                            {
                                email: loginAction.payload.email,
                                password: loginAction.payload.password,
                                returnSecureToken: true,
                            }
                        )
                        .pipe(
                            tap(resData => {
                                this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                            }),
                            map(resData => handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken)),
                            catchError((errorRes) => handleError(errorRes)),
                        )
                })
            )
    )

    authRedirect$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(AuthActions.AUTHENTICATE_SUCCESS),
                tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
                    if (authSuccessAction.payload.redirect)
                        this.router.navigate(['/']);
                })
            ),
        {
            dispatch: false
        }
    )

    autoLogin$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {

            const userData: {
                email: string;
                id: string;
                _token: string;
                _tokenExparationDate: string;
            } = JSON.parse(localStorage.getItem('userData'));

            if (!userData) {
                return { type: 'No user data' };
            };

            const loadedUser = new User(
                userData.email,
                userData.id,
                userData._token,
                new Date(userData._tokenExparationDate)
            );

            if (loadedUser.token) {
                this.authService.setLogoutTimer(new Date(userData._tokenExparationDate).getTime() - new Date().getTime());
                return new AuthActions.AuthenticateSuccess({
                    email: loadedUser.email,
                    userId: loadedUser.id,
                    token: loadedUser.token,
                    expirationDate: new Date(userData._tokenExparationDate),
                    redirect: false
                })
            };

            return { type: 'invalid token' };
        })
    ));

    authLogout$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(AuthActions.LOGOUT),
                tap(() => {
                    this.router.navigate(['/auth']);
                    this.authService.clearLogoutTimer();
                    localStorage.removeItem('userData');
                })
            ), { dispatch: false })
}