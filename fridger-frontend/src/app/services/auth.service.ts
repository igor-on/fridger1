import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../shared/models/auth-reponse.model';
import { Router } from '@angular/router';
import { MessageService } from './message.service';
import { UserService } from './user.service';
import { TokenService } from './token.service';
import { AuthUser } from '../shared/models/auth-user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private messageService: MessageService,
    private userService: UserService,
    private tokenService: TokenService
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
    this.userService.authUser.next(undefined);
    localStorage.removeItem('token');

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
      .post<AuthResponse>(
        'http://localhost:8080/auth/authenticate',
        {
          username: username,
          password: password,
        },
        { withCredentials: true }
      )
      .subscribe({
        next: (auth: AuthResponse) => {
          this._handleAuthentication(auth);
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

  autologin() {
    const token = this.tokenService.getJwtToken();
    const claims = this.tokenService.getJwtClaims(token);
    if (!claims || !token) return;

    const authenticatedUser = new AuthUser(
      claims.sub,
      token,
      new Date(claims.exp * 1000)
    );

    if (!authenticatedUser.token) {
      return;
    }

    this.userService.authUser.next(authenticatedUser);
  }

  refreshToken() {
    return this.httpClient
      .get<{ token: string }>('http://localhost:8080/auth/refresh-token', {
        withCredentials: true,
      })
      .subscribe({
        next: (auth: { token: string }) => {
          this._handleAuthentication(auth);
        },
        error: err => {
          console.log('error refreshing token, logging out...', err);
          this.logout(true);
        },
        // complete: () => {},
      });
  }
  private _handleAuthentication(auth: AuthResponse) {
    localStorage.setItem('token', auth.token);

    const claims = this.tokenService.getJwtClaims(auth.token);
    if (!claims) return;

    const authenticatedUser = new AuthUser(
      claims.sub,
      auth.token,
      new Date(claims.exp * 1000)
    );

    this.userService.authUser.next(authenticatedUser);
  }
}
