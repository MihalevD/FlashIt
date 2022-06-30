import { UserService } from 'src/app/user.service';
import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import 'tw-elements';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'FlashIt';

  isLanding = true;
  constructor(private router: Router, private userService: UserService) {
    this.router.events.subscribe((event: any) => {
      if (event.url) {
        this.isLanding = event.url === '/';
      }
    });
  }

  ngOnInit(): void {
    this.userService.isAuthenticated();
  }
}
