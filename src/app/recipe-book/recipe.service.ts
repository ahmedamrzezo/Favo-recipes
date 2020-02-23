import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shopping-list/shopping.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'First Recipe',
  //     'This is the first recipe in our recipes book',
  //     `https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-0.3.5&ixid=
  //      eyJhcHBfaWQiOjEyMDd9&s=9647d95a500b5e222258fb03ed086ed1&auto=format&fit=crop&w=400&q=80`,
  //      [
  //        new Ingredient('ingredient a1', 250),
  //        new Ingredient('ingredient a2', 50),
  //       ]
  //     ),
        
  //   new Recipe(
  //     'Second Recipe',
  //     'This is the second recipe in our recipes book',
  //     `https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-0.3.5&ixid=
  //     eyJhcHBfaWQiOjEyMDd9&s=9647d95a500b5e222258fb03ed086ed1&auto=format&fit=crop&w=400&q=80`,
  //     [
  //       new Ingredient('ingredient b1', 250),
  //       new Ingredient('ingredient b2', 100)
  //     ]
  //   ),
  // ];

  private recipes: Recipe[] = [];

  recipeAdded = new Subject<Recipe[]>();


  constructor(private slService: ShoppingService) {  }
  

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientToShoppings(ings: Ingredient[]) {
    this.slService.getNewShopping(ings);
  }

  addNewRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeAdded.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeAdded.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipeAdded.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeAdded.next(this.recipes.slice());
  }
}
// "auth != null"
