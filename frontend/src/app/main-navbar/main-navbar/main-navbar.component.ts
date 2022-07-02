import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.css'],
})
export class MainNavbarComponent implements OnInit {
  user = { username: '', imageURL: '', role: '' };
  constructor(private userService: UserService) {
    this.userService.user.subscribe((user: any) => {
      this.user = user;
      console.log(this.user);
    });
  }

  ngOnInit(): void {}

  signOut() {
    this.userService.signOut();
  }
}
