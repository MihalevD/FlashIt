import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class GamesServices {
  errorSubject: any = new BehaviorSubject<any>(null);
  errorMessage: any = this.errorSubject.asObservable();

  successSubject: any = new BehaviorSubject<any>(null);
  successMessage: any = this.successSubject.asObservable();
  gamesSubject: any = new BehaviorSubject<any>(null);
  games: any = this.gamesSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  addGame(name: string, imageURL: string): any {
    if (
      this.userService.user.role !== 'Admin' ||
      this.userService.user.role !== 'Creator'
    ) {
      this.errorSubject.next(
        'You are not an Admin/Creator. You can not delete/update games!'
      );
      return;
    }
    this.http
      .post(
        `${environment.apiURL}/games`,
        { name, imageURL },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )
      .toPromise()
      .then((res: any) => {
        this.successSubject.next(res.message);
        this.getGames();
        this.router.navigateByUrl('games');
      })
      .catch((err) => {
        console.log(err);
        this.errorSubject.next(err.error.error);
      });
  }

  getGames(): any {
    this.http
      .get(`${environment.apiURL}/games`)
      .toPromise()
      .then()
      .then((res: any) => {
        this.gamesSubject.next(res.json().data);
      })
      .catch((err) => {
        console.log(err);
        this.errorSubject.next(err.error.error);
      });
  }

  updateGame(body: any, gameId: any): any {
    if (this.userService.user.role !== 'Admin') {
      this.errorSubject.next(
        'You are not an Admin. You can not delete/update games!'
      );
      return;
    }
    this.http
      .put(`${environment.apiURL}/games/${gameId}`, body, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .toPromise()
      .then((res: any) => {
        this.successSubject.next(res.message);
        this.getGames();
        this.router.navigateByUrl('games');
      })
      .catch((err) => {
        console.log(err);
        this.errorSubject.next(err.error.error);
      });
  }

  deleteGame(gameId: any): any {
    if (this.userService.user.role !== 'Admin') {
      this.errorSubject.next(
        'You are not an Admin. You can not delete/update games!'
      );
      return;
    }
    this.http
      .delete(`${environment.apiURL}/games/${gameId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .toPromise()
      .then((res: any) => {
        this.successSubject.next(res.message);
        this.getGames();
        this.router.navigateByUrl('games');
      })
      .catch((err) => {
        console.log(err);
        this.errorSubject.next(err.error.error);
      });
  }
}
