import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/shopping', pathMatch: 'full' },
  { path: 'recipes', loadChildren: './recipe-book/recipes.module#RecipesModule' },
  { path: 'shopping', loadChildren: './shopping-list/shopping.module#ShoppingModule' },
  { path: 'sign-up', loadChildren: './auth/auth.module#AuthModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
