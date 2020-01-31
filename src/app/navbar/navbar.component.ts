import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../Services/auth.service';
import {FoodServiceClient} from '../Services/food.service.client';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private foodbackendService: FoodServiceClient) {}
  isAuth = window.localStorage.getItem('jwt-token') != null;
  User = {};
  ngOnInit() {
    this.authService.authState.subscribe(auth => {
      this.isAuth = auth;
    });
    this.authService.userInfo.subscribe(user => {
      this.User = user;
    });
    if (this.isAuth) {
      this.foodbackendService.FetchUserInfomation().then(user => {
        this.User = user;
        console.log('yes');
      });
    }
  }
  GoToAllRecipe() {
    this.router.navigate(['foods/create']);
  }
  GoToRegister() {
    this.router.navigate(['Register']);
  }
  GoToLogIn() {
    this.router.navigate(['LogIn']);
  }
  GoToAllFood() {
    this.router.navigate(['foods']);
  }
  LogUserOut() {
   this.authService.signout();
  }
  GoToProfile() {
    this.router.navigate(['profile']);
  }
}



