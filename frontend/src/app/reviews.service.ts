import { UserService } from './user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  errorSubject: any = new BehaviorSubject<any>(null);
  errorMessage: any = this.errorSubject.asObservable();

  successSubject: any = new BehaviorSubject<any>(null);
  successMessage: any = this.successSubject.asObservable();
  reviewsSubject: any = new BehaviorSubject<any>(null);
  reviews: any = this.reviewsSubject.asObservable();

  gameId: any;

  userObject: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {
    this.userService.user.subscribe((user: any) => {
      this.userObject = user;
    });
  }

  addReview(gameId: any, rating: number, description: string): any {
    this.http
      .post(`${environment.apiURL}/reviews/${gameId}`, {
        rating,
        description,
        user_id: this.userObject.id,
      })
      .toPromise()
      .then((res: any) => {
        this.successSubject.next(res.message);
        this.getReviews(this.gameId);
      })
      .catch((err) => {
        console.log(err);
        this.errorSubject.next(err.error.error);
      });
  }

  getReviews(gameId: any): any {
    this.gameId = gameId;
    this.http
      .get(`${environment.apiURL}/reviews/${gameId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .toPromise()
      .then()
      .then((res: any) => {
        this.reviewsSubject.next(res);
      })
      .catch((err) => {
        console.log(err);
        this.errorSubject.next(err.error.error);
      });
  }

  updateReview(body: any, gameId: any, reviewId: any): any {
    this.http
      .put(`${environment.apiURL}/reviews/${gameId}/${reviewId}`, body)
      .toPromise()
      .then((res: any) => {
        this.successSubject.next(res.message);
        this.getReviews(gameId);
      })
      .catch((err) => {
        console.log(err);
        this.errorSubject.next(err.error.error);
      });
  }

  deleteReview(gameId: any, reviewId: any): any {
    this.http
      .delete(`${environment.apiURL}/reviews/${gameId}/${reviewId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .toPromise()
      .then((res: any) => {
        this.successSubject.next(res.message);
        this.getReviews(gameId);
      })
      .catch((err) => {
        console.log(err);
        this.errorSubject.next(err.error.error);
      });
  }
}
