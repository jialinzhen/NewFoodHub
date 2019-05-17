import {Component, OnInit, ViewChild} from '@angular/core';
import {Recipe} from '../../models/recipe.model';
import {NgForm} from '@angular/forms';
import {FoodServiceClient} from '../../Services/food.service.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-recipe-form',
  templateUrl: './create-recipe-form.component.html',
  styleUrls: ['./create-recipe-form.component.css']
})
export class CreateRecipeFormComponent implements OnInit {
  newRecipe = {
    Name: '',
    Description: '',
    Ingredient: '',
    Method: '',
    Category: '',
    PictureUrl: ''
  };
  @ViewChild('recipeForm') recipeForm: NgForm;

  constructor(public foodbackendService: FoodServiceClient, private router: Router) { }

  ngOnInit() {
  }
  onSubmit() {
    this.newRecipe.Name = this.recipeForm.value.recipeName;
    this.newRecipe.Description = this.recipeForm.value.recipeDescription;
    this.newRecipe.Ingredient = this.recipeForm.value.recipeIngredient;
    this.newRecipe.Method = this.recipeForm.value.recipeMethod;
    this.newRecipe.Category = this.recipeForm.value.recipeCategory;
    this.newRecipe.PictureUrl = this.recipeForm.value.recipePicture;
    this.foodbackendService.AddOneRecipe(this.newRecipe).then(response => {
      this.router.navigate(['foods']);
    });
  }
}
