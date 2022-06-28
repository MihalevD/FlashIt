import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from './../environments/environment';

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
        console.log(res);
        if (res && res.token) {
          sessionStorage.setItem('token', res.token);
          this.errorSubject.next(null);
          if (res.data) {
            this.userSubject.next(res.data);
          }
          this.router.navigateByUrl('dashboard');
        } else if (res.Message) {
          this.errorSubject.next(res.Message);
        }
      });
  }

  register(username: string, email: string, password: string): any {
    this.http
      .post(`${environment.apiURL}/register`, { username, email, password })
      .toPromise()
      .then((res: any) => {
        if (res && res.jwt) {
          sessionStorage.setItem('jwt', res.jwt);
          this.errorSubject.next(null);
          if (res.data) {
            this.userSubject.next(res.data);
          }
          this.router.navigateByUrl('dashboard');
        } else if (res.Message) {
          this.errorSubject.next(res.Message);
        }
      });
  }

  isAuthenticated(): boolean {
    if (sessionStorage.getItem('jwt')) {
      return true;
    } else {
      return false;
    }
  }
}
