import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as FromApp from '../store/app.reducer'
import * as AuthActions from '../auth/store/auth.actions'

@Injectable({ providedIn: 'root' })
export class AuthService {

  activeUserTokenExpirationTimer: any;

  constructor(private store: Store<FromApp.AppState>) { }

  setLogoutTimer(expiratuonDuration: number) {
    this.activeUserTokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expiratuonDuration);
  }

  clearLogoutTimer() {
    if (this.activeUserTokenExpirationTimer) {
      clearTimeout(this.activeUserTokenExpirationTimer);
      this.activeUserTokenExpirationTimer = null
    }
  }
}
