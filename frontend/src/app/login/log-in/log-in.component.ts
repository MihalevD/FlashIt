import { Component, OnInit } from '@angular/core';
import { UserService } from './../../user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  username: string = '';
  password: string = '';
  isUsernameValid: boolean = true;
  error: any = null;

  constructor(private loginService: UserService) {}

  ngOnInit(): void {
    this.loginService.errorSubject.subscribe((errorMessage: any) => {
      this.error = errorMessage;
    });
  }

  validateUsername(): void {
    const pattern = RegExp(/^[\w-.]*$/);
    if (pattern.test(this.username)) {
      this.isUsernameValid = true;
    } else {
      this.isUsernameValid = false;
    }
  }

  onKey(event: any, type: string) {
    if (type === 'username') {
      this.username = event.target.value;
      this.validateUsername();
    } else if (type === 'password') {
      this.password = event.target.value;
    }
  }

  onSubmit() {
    if (this.isUsernameValid) {
      this.loginService.login(this.username, this.password);
    }
  }
}
