import { ReviewsService } from './../reviews.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
})
export class PlayComponent implements OnInit {
  gameURL: string = '';
  show = false;

  gameID = '';

  description: string = '';

  rating: string = '0';
  isRatingValid: boolean = true;

  reviews = [{ rating: 0, description: '' }];

  error: any;

  user: any = '';
  constructor(
    private route: ActivatedRoute,
    private reviewsService: ReviewsService,
    private userService: UserService
  ) {
    this.reviewsService.reviews.subscribe((reviews: any) => {
      this.reviews = reviews;
      console.log(this.reviews);
    });
    this.userService.user.subscribe((user: any) => {
      this.user = user;
      console.log(user);
    });
  }
  ngOnInit(): void {
    let gameId = this.route.snapshot.paramMap.get('gameId');
    let name = this.route.snapshot.paramMap.get('gameName');
    if (gameId) {
      this.gameID = gameId;
    }
    if (name) {
      let f = name.slice(0, name.length - 2);
      this.gameURL = 'https://' + f + '.' + 'io';
    }
  }

  validateRating(): void {
    const pattern = RegExp(/^[0-9]*$/);
    console.log(this.rating);
    if (pattern.test(this.rating)) {
      this.isRatingValid = true;
    } else {
      this.isRatingValid = false;
    }
  }

  onKey(event: any, type: string) {
    if (type === 'rating') {
      this.rating = event.target.value;
      this.validateRating();
    } else if (type === 'description') {
      this.description = event.target.value;
    }
  }

  openAddReview() {
    this.show = true;
  }

  addReview() {
    this.reviewsService.addReview(
      this.reviewsService.gameId,
      Number(this.rating),
      this.description
    );
  }
}
