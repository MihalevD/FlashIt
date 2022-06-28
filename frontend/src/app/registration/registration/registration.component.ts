import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  valid = {
    username: true,
    email: true,
    password: true,
  };

  constructor(private registerService: UserService) {}

  ngOnInit(): void {}

  validate(type: string): void {
    const usernamePattern = /^[\w-.]*$/;
    const emailPattern = /\S+@\S+\.\S+/;

    if (type === 'username') {
      if (this.username.length < 5) {
        this.valid.username = false;
      } else {
        this.valid.username = usernamePattern.test(this.username);
      }
    } else if (type === 'email') {
      this.valid.email = emailPattern.test(this.email);
    } else if (type === ('confirmPassword' || 'password')) {
      if (this.password !== this.confirmPassword) {
        this.valid.password = false;
      } else {
        this.valid.password = true;
      }
    }
  }

  onKey(event: any, type: string) {
    if (type === 'username') {
      this.username = event.target.value;
    } else if (type === 'email') {
      this.email = event.target.value;
    } else if (type === 'password') {
      this.password = event.target.value;
    } else if (type === 'confirmPassword') {
      this.confirmPassword = event.target.value;
    }
    this.validate(type);
  }

  onSubmit() {
    this.registerService.register(this.username, this.email, this.password);
  }
}
