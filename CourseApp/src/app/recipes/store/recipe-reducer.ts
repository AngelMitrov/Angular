import { Recipe } from "../recipes.model";
import * as RecipeActions from './recipe-actions';


export interface State {
    recipes: Recipe[];
    editedRecipe: Recipe;
    editedRecipeIndex: number;
}

const initialState: State = {
    recipes: [],
    editedRecipe: null,
    editedRecipeIndex: -1
}

export function recipeReducer(state: State = initialState, action: RecipeActions.RecipeActions) {
    switch (action.type) {

        case RecipeActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            };

        case RecipeActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };

        case RecipeActions.DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter((recipe, recipeIndex) => {
                    return recipeIndex !== state.editedRecipeIndex;
                }),
                editedRecipeIndex: -1,
                editedRecipe: null
            };

        case RecipeActions.UPDATE_RECIPE:
            const updatedRecipe = { ...state.recipes[state.editedRecipeIndex], ...action.payload };
            const updatedRecipes = [...state.recipes];
            updatedRecipes[state.editedRecipeIndex] = updatedRecipe;
            return {
                ...state,
                recipes: updatedRecipes,
                editedRecipeIndex: -1,
                editedRecipe: null
            };

        case RecipeActions.FETCH_RECIPES:
            return {
                ...state
            };

        case RecipeActions.STORE_RECIPES:
            return {
                ...state,
                editedRecipe: null,
                editedRecipeIndex: -1
            };

        case RecipeActions.START_EDIT:
            return {
                ...state,
                editedRecipeIndex: action.payload,
                editedRecipe: { ...state.recipes[action.payload] }
            };

        case RecipeActions.STOP_EDIT:
            return {
                ...state,
                editedRecipe: null,
                editedRecipeIndex: -1
            };

        default:
            return state
    }
}