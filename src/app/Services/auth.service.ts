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
  @Output() errorState: EventEmitter<String> = new EventEmitter();
  @Output() userInfo: EventEmitter<{}> = new EventEmitter();
  Register(formdata) {
    this.foodbackendService.RegisterUserUp(formdata).then(response => {
      if (!response.err) {
        window.localStorage.setItem('jwt-token', response.token);
      } else {
        this.errorState.emit(response.err);
      }
    }).then(res => {
      this.foodbackendService.FetchUserInfomation().then(user => {
        if (user) {
          this.router.navigate(['foods']);
          this.authState.emit(true);
          this.userInfo.emit(user);
        }
      });
    }).catch(err => console.log(err));
  }
  signIn(formdata) {
    this.foodbackendService.LoggingUserIn(formdata).then(response => {
      if (!response.err) {
        window.localStorage.setItem('jwt-token', response.token);
      } else {
        this.errorState.emit(response.err);
      }
    }).then((response) => {
      if (window.localStorage.getItem('jwt-token')) {
        this.foodbackendService.FetchUserInfomation().then(
          user => {
            this.router.navigate(['foods']);
            this.authState.emit(true);
            this.userInfo.emit(user);
          }
        );
      }
    });
  }
  signout() {
    window.localStorage.removeItem('jwt-token');
    this.router.navigate(['LogIn']);
     this.authState.emit(false);
  }
}
