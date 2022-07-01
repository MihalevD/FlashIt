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

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  addReview(gameId: any, rating: string, description: string): any {
    this.http
      .post(`${environment.apiURL}/games/${gameId}/reviews`, {
        rating,
        description,
        user_id: this.userService.user.id,
      })
      .toPromise()
      .then((res: any) => {
        this.successSubject.next(res.message);
        this.reviews.push({
          rating,
          description,
          user_id: this.userService.user.id,
        });
      })
      .catch((err) => {
        console.log(err);
        this.errorSubject.next(err.error.error);
      });
  }

  getReviews(gameId: any): any {
    this.http
      .get(`${environment.apiURL}/games/${gameId}/reviews`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .toPromise()
      .then()
      .then((res: any) => {
        this.reviewsSubject.next(res.json().data);
      })
      .catch((err) => {
        console.log(err);
        this.errorSubject.next(err.error.error);
      });
  }

  updateReview(body: any, gameId: any, reviewId: any): any {
    this.http
      .put(`${environment.apiURL}/games/${gameId}/reviews/${reviewId}`, body)
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
      .delete(`${environment.apiURL}/games/${gameId}/reviews/${reviewId}`, {
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
