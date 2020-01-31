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
    password: '',
    DisplayName: '',
    ProfileUrl: '',
  }
  isError: '';
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.errorState.subscribe(error => {
      this.isError = error;
    });
  }
  onRegister() {
    this.FormSubmit.DisplayName = this.SignUpForm.value.DisplayUserName;
    this.FormSubmit.email = this.SignUpForm.value.RegisterEmail;
    this.FormSubmit.password = this.SignUpForm.value.RegisterPassword;
    this.FormSubmit.ProfileUrl = this.SignUpForm.value.RegisterProfileUrl;
    this.authService.Register(this.FormSubmit);
  }
}
