import {Component, OnInit, ViewChild} from '@angular/core';
import {FoodServiceClient} from '../../../Services/food.service.client';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../Services/auth.service';

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
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {

  }
  onRegister() {
    this.FormSubmit.email = this.SignUpForm.value.RegisterEmail;
    this.FormSubmit.password = this.SignUpForm.value.RegisterPassword;
    this.authService.Register(this.FormSubmit);
  }
}
