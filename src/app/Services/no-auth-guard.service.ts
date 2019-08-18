import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class NoAuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    if (window.localStorage.getItem('jwt-token') == null) {
      return true;
    } else {
      this.router.navigate(['foods']);
      return false;
    }
  }
}
