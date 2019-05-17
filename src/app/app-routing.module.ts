import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RecipelistComponent} from './recipelist/recipelist.component';
import {CreateRecipeFormComponent} from './Forms/create-recipe-form/create-recipe-form.component';
import {EditRecipeFormComponent} from './Forms/edit-recipe-form/edit-recipe-form.component';
import {EditRecipeCommentFormComponent} from './Forms/edit-recipe-comment-form/edit-recipe-comment-form.component';
import {CreateRecipeCommentFormComponent} from './Forms/create-recipe-comment-form/create-recipe-comment-form.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RegisterFormComponent} from './Forms/Authentication/register-form/register-form.component';
import {LogInFormComponent} from './Forms/Authentication/log-in-form/log-in-form.component';

const routes: Routes = [
  {path: '', redirectTo: 'foods', pathMatch: 'full'},
  {path: 'Register', component: RegisterFormComponent},
  {path: 'LogIn', component: LogInFormComponent},
  {path: 'foods', component: RecipelistComponent},
  {path: 'foods/create', component: CreateRecipeFormComponent},
  {path: 'foods/:id', component: RecipeDetailComponent},
  {path: 'foods/:id/edit', component: EditRecipeFormComponent},
  {path: 'foods/:id/createComment', component: CreateRecipeCommentFormComponent},
  {path: 'foods/:id/:commentid/edit', component: EditRecipeCommentFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
