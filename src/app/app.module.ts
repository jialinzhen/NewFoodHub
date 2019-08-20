import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipelistComponent } from './recipelist/recipelist.component';
import { CreateRecipeFormComponent } from './Forms/create-recipe-form/create-recipe-form.component';
import { CreateRecipeCommentFormComponent } from './Forms/create-recipe-comment-form/create-recipe-comment-form.component';
import { EditRecipeFormComponent } from './Forms/edit-recipe-form/edit-recipe-form.component';
import { EditRecipeCommentFormComponent } from './Forms/edit-recipe-comment-form/edit-recipe-comment-form.component';
import {FoodServiceClient} from './Services/food.service.client';
import { RegisterFormComponent } from './Forms/Authentication/register-form/register-form.component';
import { LogInFormComponent } from './Forms/Authentication/log-in-form/log-in-form.component';
import {AuthGuardService} from './Services/auth-guard.service';
import {NoAuthGuardService} from './Services/no-auth-guard.service';
import {AuthService} from './Services/auth.service';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RecipeDetailComponent,
    RecipelistComponent,
    CreateRecipeFormComponent,
    CreateRecipeCommentFormComponent,
    EditRecipeFormComponent,
    EditRecipeCommentFormComponent,
    RegisterFormComponent,
    LogInFormComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [FoodServiceClient, AuthGuardService, NoAuthGuardService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
