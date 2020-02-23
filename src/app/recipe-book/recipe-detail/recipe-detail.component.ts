import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingService } from '../../shopping-list/shopping.service';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  providers: [ShoppingService]
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  selectedRecipe: Recipe;
  paramsSubscription: Subscription;
  id: number;

  constructor( private recipeService: RecipeService , private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.paramsSubscription = this.route.params
    .subscribe((params: Params) => {
      this.id = params['id'];
      this.selectedRecipe = this.recipeService.getRecipe(+params.id-1);
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  sendIngredient() {
    this.recipeService.addIngredientToShoppings(this.selectedRecipe.ingredients);
    this.router.navigate(['shopping'], {relativeTo: this.route.parent.parent});
  }

  deleteRecipe(index: number) {
    this.recipeService.deleteRecipe(index);
    this.router.navigate(['recipes']);
  }

}
