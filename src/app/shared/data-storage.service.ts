import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RecipeService } from "../recipe-book/recipe.service";
import { Recipe } from "../recipe-book/recipe.model";
import { map, tap, take, exhaust, exhaustMap } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})

export class DataStorageService {
  databaseUrl = 'https://ng-practice-recipes.firebaseio.com/recipes.json';
  
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

  onSaveData() {
    const recipes = this.recipeService.getRecipes();
    return this.http.put<Recipe[]>(this.databaseUrl, recipes);
    
  }
  
  onFetchData() {
    return this.http
    .get<Recipe[]>(
      this.databaseUrl
      ).pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            }
          }
          )
        }),
        tap(
          recipes => {
            this.recipeService.setRecipes(recipes);
          }
        )
      );
  }
}