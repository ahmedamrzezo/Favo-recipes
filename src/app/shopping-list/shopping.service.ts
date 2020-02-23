import { Ingredient } from '../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ShoppingService {
  private shopping: Ingredient[] = [
    new Ingredient ('Apple', 1000),
    new Ingredient ('Tomatoes', 1500),
    new Ingredient ('Salt', 100),
  ];

  formEvent = new Subject<boolean>();
  ingred = new Subject<Ingredient>();
  startEditing = new Subject<number>();

  updateIngredient = new Subject<Ingredient[]>();

  getIngredients() {
    return this.shopping.slice();
  }

  getClickedIngredient(index: number) {
    return this.shopping[index];
  }
  addIng(newIng: Ingredient) {
    this.shopping.push(newIng);
    this.updateIngredient.next(this.shopping.slice());
  }

  updateIng(index:number, newIng: Ingredient) {
    this.shopping[index] = newIng;
    this.updateIngredient.next(this.shopping.slice());
  }

  deleteIng(index: number) {
    this.shopping.splice(index, 1);
    this.updateIngredient.next(this.shopping.slice());
  }
  
  getNewShopping(ing: Ingredient[]) {
    this.shopping.push(...ing);
    this.updateIngredient.next(this.shopping.slice());
  }
}
