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

  applicantsSubject: any = new BehaviorSubject<any>(null);
  applicants: any = this.applicantsSubject.asObservable();

  userForService: any;

  constructor(private http: HttpClient, private router: Router) {
    this.user.subscribe((user: any) => {
      this.userForService = user;
    });
  }

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
          this.userSubject.next(this.decodeToken(res.token));
          this.router.navigateByUrl('home');
        }
      })
      .catch((err) => {
        console.log(err);
        this.errorSubject.next(err.error.error);
      });
  }

  updateUser(body: any): any {
    this.http
      .put(`${environment.apiURL}/users/${this.userForService.id}`, body, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
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

  changeUser(body: any, userId: any): void {
    this.http
      .put(`${environment.apiURL}/users/${userId}`, body, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .toPromise()
      .then((res: any) => {
        console.log(res);
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
        this.router.navigateByUrl('home');
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

  getAllApplicants(): any {
    this.http
      .get(`${environment.apiURL}/applicants`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .toPromise()
      .then((res: any) => {
        console.log(res);
        this.applicantsSubject.next(res);
      })
      .catch((err) => {
        console.log(err);
        this.errorSubject.next(err.error.error);
      });
  }

  decodeToken = (token: any) => {
    try {
      const user = decode(token);
      return user;
    } catch {}
    return null;
  };
}
