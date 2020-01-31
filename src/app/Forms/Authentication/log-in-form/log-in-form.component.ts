import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../Services/auth.service';

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.css']
})
export class LogInFormComponent implements OnInit {
  @ViewChild('LogInForm') LoginForm: NgForm;
  LogInUserObj = {
    email: '',
    password: ''
  }
  isError: '';
  constructor(private router: Router,
              private authService: AuthService) {
    this.authService.errorState.subscribe(err => {
      this.isError = err;
    });
  }

  ngOnInit() {
  }
  onLogIn() {
    this.LogInUserObj.email = this.LoginForm.value.LogInEmail;
    this.LogInUserObj.password = this.LoginForm.value.LogInPassword;
    this.authService.signIn(this.LogInUserObj);
  }
}
