import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FoodServiceClient} from '../Services/food.service.client';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  id: string;
  RecipeDetail = {};
  CommentsForRecipe = [];
  LikeMode = true;
  AllLikes: [];
  constructor(private route: ActivatedRoute,
              public foodbackendService: FoodServiceClient,
              private router: Router) { }
  isAuth = window.localStorage.getItem('jwt-token') != null;
  ProfilePictureUrl = '../../assets/download.jpeg';
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.foodbackendService.GetOneRecipe(this.id).then(recipe => {
      this.RecipeDetail = recipe;
      this.CommentsForRecipe = recipe.CommentList;
    }).then(() => {
      this.foodbackendService.FetchAllLikes().then(response => {
        if (window.localStorage.getItem('jwt-token') != null) {
          this.AllLikes = response;
          this.foodbackendService.FetchUserInfomation().then(user => {
            response.forEach(item => {
              if (user._id === item.User._id) {
                this.LikeMode = false;
              }
            });
          });
        }
      });
    });
  }
  NavigateToCommentCreate() {
    this.router.navigate(['/foods/' + this.id + '/createComment']);
  }
  NavigateToCommentEdit(commentid) {
    this.router.navigate(['/foods/' + this.id + '/' + commentid + '/edit']);
  }
  DeletingComment(commentid, index) {
    this.CommentsForRecipe.splice(index, 1);
    this.foodbackendService.DeleteCommentForRecipe(this.id, commentid);
  }
  LikeThisRecipe(id) {
    if (this.LikeMode) {
      this.foodbackendService.LikeARecipe(id).then(() => {
        this.LikeMode = false;
      });
    } else {
      // delete the like
      // this.foodbackendService.deleteALike(id).then(() => {
      //   this.LikeMode = true;
      //   console.log('called');
      // });
    }
  }
}
