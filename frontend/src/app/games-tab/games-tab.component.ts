import { UserService } from 'src/app/user.service';
import { GamesServices } from './../games.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-games-tab',
  templateUrl: './games-tab.component.html',
  styleUrls: ['./games-tab.component.css'],
})
export class GamesTabComponent implements OnInit {
  hovered = -1;
  selected = 0;
  games: any;

  user: any;
  constructor(
    private gamesServices: GamesServices,
    private userService: UserService
  ) {
    this.userService.user.subscribe((user: any) => {
      this.user = user;
    });
    this.gamesServices.games.subscribe((games: any) => {
      console.log(games);
      if (!this.user && games) {
        this.games = games.slice(0, 2);
      } else {
        this.games = games;
      }
    });
  }

  ngOnInit(): void {
    this.gamesServices.getGames();
  }

  mouseEnter(indexOfelement: number) {
    this.hovered = indexOfelement;
  }

  mouseLeave(indexOfelement: number) {
    this.hovered = -1;
  }
}
