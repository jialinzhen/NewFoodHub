import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {FoodServiceClient} from '../../../Services/food.service.client';

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.css']
})
export class LogInFormComponent implements OnInit {
  @ViewChild('LogInForm') LoginForm: NgForm;
  LogInUserObj = {
    username: '',
    password: ''
  }

  constructor(public foodbackendService: FoodServiceClient) { }

  ngOnInit() {
  }
  onLogIn() {
    this.LogInUserObj.username = this.LoginForm.value.LogInEmail;
    this.LogInUserObj.password = this.LoginForm.value.LogInPassword;
    this.foodbackendService.LoggingUserIn(this.LogInUserObj).then(response => console.log(response));
  }
}
