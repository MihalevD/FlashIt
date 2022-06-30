import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
})
export class PlayComponent implements OnInit {
  gameURL: string = '';

  array = [1, 2, 3, 4, 5, 6, 7, 8];
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    let name = this.route.snapshot.paramMap.get('gameName');
    if (name) {
      let f = name.slice(0, name.length - 2);
      this.gameURL = 'https://' + f + '.' + 'io';
    }
  }
}
