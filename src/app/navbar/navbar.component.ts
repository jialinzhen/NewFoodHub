import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../Services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) {}
  isAuth = false;
  ngOnInit() {
    this.authService.authState.subscribe(auth => {
      this.isAuth = auth;
    });
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
}



