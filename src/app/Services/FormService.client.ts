import {EventEmitter, Injectable, Output} from '@angular/core';
import {FoodServiceClient} from './food.service.client';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class SideBarService {
  constructor(public foodbackendService: FoodServiceClient) {}
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  FormClicked() {
    this.foodbackendService.GettingUserInfo().then(response => {
      if (response) {
        this.isUserLoggedIn.next(true);
      } else {
        this.isUserLoggedIn.next(false);
      }
    });
  }
}
