import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { exhaustMap, map, switchMap, take, withLatestFrom } from "rxjs/operators";
import { Recipe } from "../recipes.model";

import * as RecipeActions from "./recipe-actions";
import * as fromApp from "../../store/app.reducer";


@Injectable()
export class RecipeEffects {

  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) { }

  fetchRecipes$ = createEffect(() => this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http
        .get<Recipe[]>(`https://ng-course-project-ee81a-default-rtdb.europe-west1.firebasedatabase.app/recipies.json`)
        .pipe(
          map(recipeData => {
            return recipeData.map(recipe => {
              return {
                ...recipe,
                ingredients: recipe.ingredients ? recipe.ingredients : []
              }
            })
          }),
          map(recepies => {
            return new RecipeActions.SetRecipes(recepies);
          })
        )
    })
  ));


  saveRecipes$ = createEffect(
    () => this.actions$.pipe(
      ofType(RecipeActions.STORE_RECIPES),
      withLatestFrom(this.store.select('recipes')),
      switchMap(([actionData, recipesState]) => {
        return this.http.put(`https://ng-course-project-ee81a-default-rtdb.europe-west1.firebasedatabase.app/recipies.json`, recipesState.recipes);
      })
    ),
    {
      dispatch: false
    });
}