import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import { Recipe } from '../recipes/recipes.model';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { map, of, switchMap, take } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from '../recipes/store/recipe-actions';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(
        private store: Store<fromApp.AppState>,
        private actions$: Actions
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        return this.store
            .select('recipes')
            .pipe(
                take(1),
                map(recipeState => {
                    return recipeState.recipes;
                }),
                switchMap(recipes => {
                    if (recipes.length === 0) {
                        this.store.dispatch(new RecipeActions.FetchRecipes());
                        return this.actions$.pipe(ofType(RecipeActions.SET_RECIPES), take(1));
                    } else {
                        return of(recipes);
                    }
                })
            )
    }
}
