import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../shared/models/user';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user = new Subject<User>();

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private messageService: MessageService
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

  logout(session_expired = false) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    this.router.navigate(['/login']);
    if (session_expired) {
      this.messageService.sendMessage({
        severity: 'info',
        summary: 'Session expired',
        detail: 'Please log in again',
      });
    } else {
      this.messageService.sendMessage('Successfully logged out');
    }
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
          this.messageService.sendMessage({
            severity: 'error',
            summary: 'Error logging in',
            detail: err.error.message,
          });
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
          this.logout(true);
        },
        // complete: () => {},
      });
  }
}
