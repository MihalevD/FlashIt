import { GamesServices } from './../games.service';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  user: any;
  name: string = '';
  imageURL: string = '';
  isNameValid: boolean = true;
  error: any = null;

  constructor(
    private userService: UserService,
    private gamesServices: GamesServices
  ) {
    this.userService.user.subscribe((user: any) => {
      this.user = user;
    });
  }

  ngOnInit(): void {}

  apply() {
    this.userService.updateUser({ applied: true });
  }

  validateName(): void {
    const pattern = RegExp(/^[\w-.]*$/);
    if (pattern.test(this.name)) {
      this.isNameValid = true;
    } else {
      this.isNameValid = false;
    }
  }

  onKey(event: any, type: string) {
    if (type === 'name') {
      this.name = event.target.value;
      this.validateName();
    } else if (type === 'imageURL') {
      this.imageURL = event.target.value;
    }
  }

  onSubmit() {
    if (this.isNameValid) {
      console.log('hello');
      this.gamesServices.addGame(this.name, this.imageURL);
    }
  }
}
