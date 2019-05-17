import {Injectable} from '@angular/core';

@Injectable()
export class FoodServiceClient {
  local = 'http://localhost:3002/api/';
  AddOneRecipe = recipe => fetch(this.local + 'addrecipe', {
    body: JSON.stringify(recipe),
    method: 'POST',
    headers: {
      'content-type' : 'application/json'
    }
  })
  GetAllRecipe = ()  => fetch(this.local + 'allrecipe').then(response => response.json());
  GetOneRecipe = (id) => fetch(this.local + 'foods/' + id).then(response => response.json());
  updateOneRecipe = (id, recipe) => fetch(this.local + 'foods/' + id , {
    body: JSON.stringify(recipe),
    method: 'PUT',
    headers: {
      'content-type' : 'application/json'
    }
  })
  DeleteOneRecipe = (id) => fetch(this.local + 'foods/' + id , {
    method: 'DELETE',
    headers: {
      'content-type' : 'application/json'
    }
  })
  AddingCommentForRecipe = (comment, id) => fetch(this.local + 'foods/' + id + '/comment', {
    body: JSON.stringify(comment),
    method: 'POST',
    headers: {
      'content-type' : 'application/json'
    }
  })
  UpdatingCommentForRecipe = (id, comment, commentId) => fetch(this.local + 'foods/' + id + '/comment/' + commentId, {
    body: JSON.stringify(comment),
    method: 'PUT',
    headers: {
      'content-type' : 'application/json'
    }
  })
  DeleteCommentForRecipe = (id, commentId) => fetch(this.local + 'foods/' + id + '/comment/' + commentId, {
    method: 'DELETE',
    headers: {
      'content-type' : 'application/json'
    }
  })
  FetchSingleComment = (id, commentId) => fetch(this.local + 'foods/' + id + '/comment/' + commentId).
  then(response => response.json())
  RegisterUserUp = (userInfo) => fetch(this.local + 'register', {
    body: JSON.stringify(userInfo),
    method: 'POST',
    headers: {
      'content-type' : 'application/json'
    }
  })
  saveRecipeToUser = (id) => fetch(this.local + 'foods/' + id + '/likes', {
    method: 'POST',
    headers: {
      'content-type' : 'application/json'
    }
  })
  LoggingUserIn = (LogginInfo) => fetch(this.local + 'login', {
    body: JSON.stringify(LogginInfo),
    method: 'POST',
     headers: {
      'content-type': 'application/json'
     }
  })
  LoggingUserOut = () => fetch(this.local + 'logout').then(response => console.log(response));
  FilterFoodList = (string) => fetch(this.local + 'recipes/' + string).then(response => response.json())
}
