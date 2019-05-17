import {Component, OnInit, ViewChild} from '@angular/core';
import {FoodServiceClient} from '../../Services/food.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Recipe} from '../../models/recipe.model';

@Component({
  selector: 'app-edit-recipe-form',
  templateUrl: './edit-recipe-form.component.html',
  styleUrls: ['./edit-recipe-form.component.css']
})
export class EditRecipeFormComponent implements OnInit {
  id: String;
  Recipe: Recipe;
  @ViewChild('recipeEditForm') recipeEditForm: NgForm;
  constructor(public foodbackendService: FoodServiceClient,
              private route: ActivatedRoute,
              private router: Router) { }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      console.log(this.id);
    });
    this.foodbackendService.GetOneRecipe(this.id).then(response => {
      console.log(response);
      this.Recipe = response;
    });
  }
  onSubmit() {
    this.Recipe.Name = this.recipeEditForm.value.recipeName;
    this.Recipe.Description = this.recipeEditForm.value.recipeDescription;
    this.Recipe.Ingredient = this.recipeEditForm.value.recipeIngredient;
    this.Recipe.Method = this.recipeEditForm.value.recipeMethod;
    this.Recipe.Category = this.recipeEditForm.value.recipeCategory;
    this.Recipe.PictureUrl = this.recipeEditForm.value.recipePicture;
    this.foodbackendService.updateOneRecipe(this.id, this.Recipe).then(response => {
      this.router.navigate(['/foods']);
    });
  }
}
