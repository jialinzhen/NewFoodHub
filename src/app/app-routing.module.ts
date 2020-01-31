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
import {AuthGuardService} from './Services/auth-guard.service';
import {NoAuthGuardService} from './Services/no-auth-guard.service';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
  {path: '', redirectTo: 'foods', pathMatch: 'full'},
  {path: 'Register', component: RegisterFormComponent, canActivate: [NoAuthGuardService]},
  {path: 'LogIn', component: LogInFormComponent, canActivate: [NoAuthGuardService]},
  {path: 'foods', component: RecipelistComponent},
  {path: 'foods/create', component: CreateRecipeFormComponent, canActivate: [AuthGuardService]},
  {path: 'foods/:id', component: RecipeDetailComponent},
  {path: 'foods/:id/edit', component: EditRecipeFormComponent},
  {path: 'foods/:id/createComment', component: CreateRecipeCommentFormComponent, canActivate: [AuthGuardService]},
  {path: 'foods/:id/:commentid/edit', component: EditRecipeCommentFormComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
