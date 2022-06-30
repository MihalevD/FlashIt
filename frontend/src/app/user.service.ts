import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from './../environments/environment';
import decode from 'jwt-decode';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  errorSubject: any = new BehaviorSubject<any>(null);
  errorMessage: any = this.errorSubject.asObservable();
  userSubject: any = new BehaviorSubject<any>(null);
  user: any = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): any {
    this.http
      .post(environment.apiURL + '/login', { username, password }, httpOptions)
      .toPromise()
      .then((res: any) => {
        if (res && res.token) {
          localStorage.setItem('token', res.token);
          this.errorSubject.next(null);
          this.userSubject.next(this.decodeToken(res.token));
          this.router.navigateByUrl('home');
        }
      })
      .catch((err) => {
        console.log(err);
        this.errorSubject.next(err.error.error);
      });
  }

  register(username: string, email: string, password: string): any {
    this.http
      .post(`${environment.apiURL}/register`, { username, email, password })
      .toPromise()
      .then((res: any) => {
        if (res && res.token) {
          localStorage.setItem('token', res.token);
          this.errorSubject.next(null);
          if (res.token) {
            this.userSubject.next(this.decodeToken(res.token));
          }
          this.router.navigateByUrl('home');
        }
      })
      .catch((err) => {
        console.log(err);
        this.errorSubject.next(err.error.error);
      });
  }

  signOut() {
    this.http
      .delete(`${environment.apiURL}/logout`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .toPromise()
      .then((res: any) => {
        localStorage.removeItem('token');
        this.userSubject.next(null);
      });
  }

  isAuthenticated(): boolean {
    let token = localStorage.getItem('token');
    if (token) {
      this.userSubject.next(this.decodeToken(token));
      return true;
    } else {
      return false;
    }
  }

  decodeToken = (token: any) => {
    try {
      const user = decode(token);
      return user;
    } catch {}
    return null;
  };
}
