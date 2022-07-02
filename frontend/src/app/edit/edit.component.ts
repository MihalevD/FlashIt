import { UserService } from 'src/app/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  username: string = '';
  imageURL: string = '';
  email: string = '';

  valid = {
    username: true,
    email: true,
    imageURL: true,
  };

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
    } else if (type === 'imageURL') {
      this.valid.imageURL = true;
    }
  }

  onKey(event: any, type: string) {
    if (type === 'username') {
      this.username = event.target.value;
    } else if (type === 'email') {
      this.email = event.target.value;
    } else if (type === 'imageURL') {
      this.imageURL = event.target.value;
    }
    this.validate(type);
  }

  constructor(private userService: UserService) {
    this.userService.user.subscribe((user: any) => {
      this.username = user.username;
      this.email = user.email;
      this.imageURL = user.imageURL;
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.userService.updateUser({
      username: this.username,
      email: this.email,
      imageURL: this.imageURL,
    });
  }
}
