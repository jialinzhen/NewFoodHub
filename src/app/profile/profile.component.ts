import { Component, OnInit } from '@angular/core';
import {FoodServiceClient} from '../Services/food.service.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private foodbackendService: FoodServiceClient) { }
  User = {};
  ngOnInit() {
    this.foodbackendService.FetchUserInfomation().then(user => {
      this.User = user;
      console.log(this.User);
    });
  }
}
