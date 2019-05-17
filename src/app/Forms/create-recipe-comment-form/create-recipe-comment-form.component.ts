import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FoodServiceClient} from '../../Services/food.service.client';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-create-recipe-comment-form',
  templateUrl: './create-recipe-comment-form.component.html',
  styleUrls: ['./create-recipe-comment-form.component.css']
})
export class CreateRecipeCommentFormComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              public foodbackendService: FoodServiceClient,
              private router: Router) { }
  id;
  Recipe;
  @ViewChild('CommentCreateForm') commentForm: NgForm;
  CommentToBeSubmittedObject = {
    Content: '',
    Rating: ''
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.foodbackendService.GetOneRecipe(this.id).then(recipe => {
      this.Recipe = recipe;
      console.log(this.Recipe);
    });
  }
  onSubmit() {
    this.CommentToBeSubmittedObject.Content = this.commentForm.value.CommentContent;
    this.CommentToBeSubmittedObject.Rating = this.commentForm.value.RecipeRating;
    this.foodbackendService.AddingCommentForRecipe(this.CommentToBeSubmittedObject, this.id).then(response => {
      this.router.navigate(['foods/' + this.id]);
    });
  }
}
