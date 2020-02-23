import { NgModule } from "@angular/core";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";

const shoppingRoutes: Routes = [
  { path: '', component: ShoppingListComponent, children: [
    { path: 'new', component: ShoppingListEditComponent },
    { path: ':id/edit', component: ShoppingListEditComponent }
    ] 
  }
]

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent,
  ],
  imports: [
    FormsModule,
    RouterModule.forChild(shoppingRoutes),
    SharedModule
  ],
  exports: [
    ShoppingListComponent,
    ShoppingListEditComponent,
  ]
})

export class ShoppingModule {}