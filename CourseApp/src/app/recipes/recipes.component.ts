import { Component, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Recipe } from './recipes.model';
import * as fromApp from '../store/app.reducer'

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
@Injectable({ providedIn: 'root' })
export class RecipesComponent {
  recipes: Observable<{ recipes: Recipe[] }>;

  constructor(private store: Store<fromApp.AppState>) { }

}
