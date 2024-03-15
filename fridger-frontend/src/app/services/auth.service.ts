import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  listenForTokenRefresh() {
    // this method will listen for token refresh
    setInterval(() => {
      const expDate = new Date(
        <string>localStorage.getItem('expirationDate')?.toString()
      );

      if (new Date() > expDate) {
        console.log('refreshing token...');
        this.refreshToken();
      }

      console.log('expDate', expDate);
    }, 10000);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
  }

  login(username: string, password: string) {
    return this.httpClient
      .post<{ token: string; expirationDate: Date }>(
        'http://localhost:8080/auth/generateToken',
        {
          username: 'macko',
          password: 'secret',
        },
        { withCredentials: true }
      )
      .subscribe((response: { token: string; expirationDate: Date }) => {
        localStorage.setItem('token', response.token.toString());
        localStorage.setItem(
          'expirationDate',
          response.expirationDate.toString()
        );
      });
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
