import { Action } from '@ngrx/store';
import { Recipe } from '../recipes.model';

export const SET_RECIPES = '[Recipes] Set Recipes';
export const FETCH_RECIPES = '[Recipes] Fetch Recipes';
export const STORE_RECIPES = '[Recipes] Store Recipes';
export const ADD_RECIPE = '[Recipes] Add Recipe';
export const UPDATE_RECIPE = '[Recipes] Update Recipe';
export const DELETE_RECIPE = '[Recipes] Delete Recepe';

export const START_EDIT = '[Recipes] Start Edit';
export const STOP_EDIT = '[Recipes] Stop Edit';

export class SetRecipes implements Action {
    readonly type = SET_RECIPES;
    constructor(public payload: Recipe[]) { }
}

export class AddRecipe implements Action {
    readonly type = ADD_RECIPE;
    constructor(public payload: Recipe) { }
}

export class UpdateRecipe implements Action {
    readonly type = UPDATE_RECIPE;
    constructor(public payload: Recipe) { }
}

export class DeleteRecipe implements Action {
    readonly type = DELETE_RECIPE;
}

export class FetchRecipes implements Action {
    readonly type = FETCH_RECIPES;
}

export class StoreRecipes implements Action {
    readonly type = STORE_RECIPES;
}

export class StartEdit implements Action {
    readonly type = START_EDIT;
    constructor(public payload: number) { }
}

export class StopEdit implements Action {
    readonly type = STOP_EDIT;
}



export type RecipeActions =
    SetRecipes |
    AddRecipe |
    UpdateRecipe |
    DeleteRecipe |
    FetchRecipes |
    StoreRecipes |
    StartEdit |
    StopEdit;