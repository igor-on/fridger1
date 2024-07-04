import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../common/User';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user = new Subject<User>();

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {}

  listenForTokenRefresh() {
    setInterval(
      () => {
        const expDate = new Date(
          <string>localStorage.getItem('expirationDate')?.toString()
        );
        if (new Date() > expDate) {
          console.log('refreshing token...');
          this.refreshToken();
        }
        console.log('expDate', expDate);
      },
      1000 * 60 * 5
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    this.router.navigate(['/login']);
  }

  login(username: string, password: string) {
    return this.httpClient
      .post<User>(
        'http://localhost:8080/auth/authenticate',
        {
          username: username,
          password: password,
        },
        { withCredentials: true }
      )
      .subscribe({
        next: (user: User) => {
          this._handleAuthentication(user);
          this.router.navigate(['/recipes']);
        },
        error: err => {
          console.log('error logging in...', err);
        },
      });
  }

  private _handleAuthentication(user: User) {
    localStorage.setItem('token', user.tokenData.token.toString());
    localStorage.setItem(
      'expirationDate',
      user.tokenData.expirationDate.toString()
    );
    this.user.next(new User(user.username, user.tokenData));
  }

  refreshToken() {
    return this.httpClient
      .get<{ token: string; expirationDate: Date }>(
        'http://localhost:8080/auth/refresh-token',
        { withCredentials: true }
      )
      .subscribe({
        next: (response: { token: string; expirationDate: Date }) => {
          localStorage.setItem('token', response.token.toString());
          localStorage.setItem(
            'expirationDate',
            response.expirationDate.toString()
          );
        },
        error: err => {
          console.log('error refreshing token, logging out...', err);
        },
        // complete: () => {},
      });
  }
}
