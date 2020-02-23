import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { RecipeBookComponent } from "./recipe-book.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeSelectComponent } from "./recipe-select/recipe-select.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    RecipeBookComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeSelectComponent,
    RecipeEditComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,

    RecipesRoutingModule,
    SharedModule
  ]
})

export class RecipesModule {}