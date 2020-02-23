import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('editForm') form: NgForm;
  clickedIng: Ingredient;
  ingIndex:number;
  editMode: boolean;
  name: any;
  weight: any;

  constructor(private shoppingService: ShoppingService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.shoppingService.startEditing.subscribe((id) => {
      this.ingIndex = id;
      this.editMode = true;
      this.clickedIng = this.shoppingService.getClickedIngredient(id);
      this.form.setValue({
        name: this.clickedIng.name,
        weight: +this.clickedIng.weight
      });
    });
  }

  onCancel() {
    this.shoppingService.formEvent.next(false);
  }

  onDelete() {
    if ( confirm('Do you really want to delete this item?') )
      this.shoppingService.deleteIng(this.ingIndex);
    this.shoppingService.formEvent.next(false);
  }

  onEditing() {
    if (this.form['valid']) {
      const newIngredient = new Ingredient(
        this.form['value'].name, 
        +this.form['value'].weight
        );
      if ( this.editMode) {
        this.shoppingService.updateIng(this.ingIndex, newIngredient);
      } else {
        this.shoppingService.addIng(newIngredient);
      }
      this.form.reset();
    } else {
      return false;
    }
  }

}
