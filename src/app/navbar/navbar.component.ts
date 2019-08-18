import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FoodServiceClient} from '../Services/food.service.client';
import {SideBarService} from '../Services/FormService.client';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router,
              public foodbackendService: FoodServiceClient,
              public sideService: SideBarService) {
    this.foodbackendService.GettingUserInfo().then(response => {
      this.UserInfo = response;
      this.sideService.isUserLoggedIn.subscribe(value => {
        this.isAuth = true;
      });
    });
  }
  UserInfo = null;
  isAuth = false;
  ngOnInit() {
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
   window.localStorage.removeItem('jwt-token');
  }
}



