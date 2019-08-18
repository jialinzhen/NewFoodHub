import {Component, OnInit, ViewChild} from '@angular/core';
import {FoodServiceClient} from '../../../Services/food.service.client';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  @ViewChild('RegisterForm') SignUpForm: NgForm;
  FormSubmit = {
    email: '',
    password: ''
  }
  fetchedUserInfo: {}
  constructor(private foodbackendService: FoodServiceClient, private router: Router) { }

  ngOnInit() {

  }
  onRegister() {
    this.FormSubmit.email = this.SignUpForm.value.RegisterEmail;
    this.FormSubmit.password = this.SignUpForm.value.RegisterPassword;
    this.foodbackendService.RegisterUserUp(this.FormSubmit).then(response => {
      window.localStorage.setItem('jwt-token', response.token);
    }).then(res => {
      this.foodbackendService.FetchUserInfomation().then(user => {
        console.log(user);
      });
    });
  }
}
