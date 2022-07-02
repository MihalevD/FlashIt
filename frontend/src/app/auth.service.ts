import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService implements CanActivate {
  constructor(public router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}
