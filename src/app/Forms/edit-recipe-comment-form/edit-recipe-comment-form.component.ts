import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {FoodServiceClient} from '../../Services/food.service.client';

@Component({
  selector: 'app-edit-recipe-comment-form',
  templateUrl: './edit-recipe-comment-form.component.html',
  styleUrls: ['./edit-recipe-comment-form.component.css']
})
export class EditRecipeCommentFormComponent implements OnInit {
  @ViewChild('EditCommentForm') CommentEditForm: NgForm;
  Comment;
  id;
  Recipeid;
  constructor(private route: ActivatedRoute,
              public foodBackendService: FoodServiceClient,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['commentid'];
      this.Recipeid = params['id'];
      this.foodBackendService.FetchSingleComment(this.Recipeid, this.id).then(commentObj => {
        this.Comment = commentObj;
      });
    });
  }
  UpdateCommentForPost() {
    console.log(this.Comment);
    this.Comment.Content = this.CommentEditForm.value.commentContent;
    this.Comment.Rating = this.CommentEditForm.value.commentRating;
    this.foodBackendService.UpdatingCommentForRecipe(this.Recipeid, this.Comment, this.id).then(response => {
      this.router.navigate(['foods/' + this.Recipeid]);
    });
  }
}
