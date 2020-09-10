import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: RecipeListComponent
  },
  {
    path: 'recipe-list',
    component: RecipeListComponent
  },
  {
    path: 'add-recipe',
    component: AddRecipeComponent
  },
  {
    path: 'add-recipe/:recipeId',
    component: AddRecipeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
