import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NoAuthService {
  constructor(public router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('token') != null) {
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}
