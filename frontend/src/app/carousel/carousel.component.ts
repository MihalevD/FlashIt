import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  hovered = false;
  selected = 0;
  items = [
    {
      imageURL:
        'https://images-na.ssl-images-amazon.com/images/I/A1xocZ+j49L.png',
      redirect: 'snakeIO',
    },
    {
      imageURL:
        'https://images.crazygames.com/ev-io/20210120171539/ev-io-cover?auto=format,compress&q=75&cs=strip&ch=DPR&w=1200&h=630&fit=crop',
      redirect: 'evIO',
    },
    {
      imageURL:
        'https://images.crazygames.com/games/diepio/cover-1643031010290.png?auto=format,compress&q=75&cs=strip&ch=DPR&w=1200&h=630&fit=crop',
      redirect: 'diepIO',
    },
  ];
  constructor() {}

  ngOnInit(): void {}

  next() {
    if (this.selected === this.items.length - 1) {
      this.selected = 0;
    } else {
      this.selected += 1;
    }
  }

  previous() {
    if (this.selected === 0) {
      this.selected = this.items.length - 1;
    } else {
      this.selected -= 1;
    }
  }
  mouseEnter() {
    this.hovered = true;
  }

  mouseLeave() {
    this.hovered = false;
  }
}
