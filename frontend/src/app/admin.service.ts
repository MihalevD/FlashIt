import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AdminService implements CanActivate {
  role = '';
  constructor(public router: Router, private userService: UserService) {
    this.userService.user.subscribe((user: any) => {
      this.role = user.role;
    });
  }

  canActivate(): boolean {
    if (this.role !== 'ADMIN') {
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}
