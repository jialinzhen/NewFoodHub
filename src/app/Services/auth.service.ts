import {EventEmitter, Injectable, Output} from '@angular/core';
import {FoodServiceClient} from './food.service.client';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private foodbackendService: FoodServiceClient,
              private router: Router) {
  }
  @Output() authState: EventEmitter<boolean> = new EventEmitter();
  Register(formdata) {
    this.foodbackendService.RegisterUserUp(formdata).then(response => {
      window.localStorage.setItem('jwt-token', response.token);
    }).then(res => {
      this.foodbackendService.FetchUserInfomation().then(user => {
        console.log(user);
        this.router.navigate(['foods']);
         this.authState.emit(true);
      });
    });
  }
  signIn(formdata) {
    this.foodbackendService.LoggingUserIn(formdata).then(response => {
      window.localStorage.setItem('jwt-token', response.token);
    }).then((response) => {
      this.foodbackendService.FetchUserInfomation().then(
        res => {
          this.router.navigate(['foods']);
           this.authState.emit(true);
        }
      );
    });
  }
  signout() {
    window.localStorage.removeItem('jwt-token');
     this.authState.emit(false);
  }
}
