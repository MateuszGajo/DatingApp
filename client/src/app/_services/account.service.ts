import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject } from 'rxjs';
import { AuthResp } from '../_models/auth';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post<AuthResp>(this.baseUrl + 'account/login', model).pipe(
      map((response) => {
        const user = response.user;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(model: any) {
    return this.http
      .post<AuthResp>(this.baseUrl + 'account/register', model)
      .pipe(
        map((response) => {
          const user = response.user;
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSource.next(user);
          }
        })
      );
  }

  setCurrentUser(user: User | null) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
