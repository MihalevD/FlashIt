import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  isLogged = null;

  user: any = {};

  constructor(private userService: UserService) {
    this.userService.user.subscribe((user: any) => {
      this.isLogged = user;
      this.user = user;
    });
  }

  ngOnInit(): void {}
}
