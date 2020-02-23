import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  shoppings: Ingredient[];
  formIsShown = false;
  id: number;
  formEventSubscription: Subscription;
  igredientSubscription: Subscription;

  constructor(private shoppingService: ShoppingService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.shoppings = this.shoppingService.getIngredients();
    this.formEventSubscription = this.shoppingService.formEvent.subscribe(
      (stat: boolean) => {
        this.formIsShown = stat;
      }
    );
    this.shoppingService.updateIngredient
      .subscribe((shoppings: Ingredient[]) => {
        this.shoppings = shoppings;
    });
  }
  ngOnDestroy() {
    this.formEventSubscription.unsubscribe();
  }

  wantEdit(id: number) {
    this.formIsShown = true;
    this.id = id;
    this.shoppingService.startEditing.next(id);
    this.route.params.subscribe((parms: Params) => {
      this.id = +parms.id;
    });
  }
  
}
