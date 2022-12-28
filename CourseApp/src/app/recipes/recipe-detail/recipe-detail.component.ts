import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipes.model';
import { Store } from '@ngrx/store';

import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as RecipeActions from '../store/recipe-actions';
import * as fromApp from '../../store/app.reducer';
import { map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(private route: ActivatedRoute, private router: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.route.params
      .pipe(
        map(params => {
          return +params['id'];
        }),
        switchMap(id => {
          this.id = id;
          return this.store.select('recipes')
        }),
        map(recipeState => {
          return recipeState.recipes.find(
            (recipe, index) => {
              return index === this.id;
            })
        })
      )
      .subscribe(recipe => {
        this.recipe = recipe;
      })
  }

  toShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route })
  }

  onDelete() {
    this.store.dispatch(new RecipeActions.DeleteRecipe());
    this.router.navigate(['../'], { relativeTo: this.route })
  }
}
