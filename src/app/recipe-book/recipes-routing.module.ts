import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RecipeBookComponent } from "./recipe-book.component";
import { AuthGuard } from "../auth/login/auth.guard";
import { RecipeSelectComponent } from "./recipe-select/recipe-select.component";
import { RecipesResolverService } from "./recipes-resolver.service";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";

const recipesRoutes: Routes = [
  { path: '', component: RecipeBookComponent,
  canActivate: [AuthGuard],
  children: [
  { path: '', component: RecipeSelectComponent, resolve: [RecipesResolverService] },
  { path: 'create', component: RecipeEditComponent },
  { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
  { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] },
] }];

@NgModule({
  imports: [RouterModule.forChild(recipesRoutes)],
  exports: [RouterModule]
})

export class RecipesRoutingModule {}