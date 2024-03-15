import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // const authToken = this.authService.getToken();
    console.log('intercepted!');

    if (!req.url.includes('auth')) {
      const token = localStorage.getItem('token');
      const authRequest = req.clone({
        withCredentials: true,
        headers: req.headers.set('Authorization', 'Bearer ' + token || ''),
      });
      return next.handle(authRequest);
    }

    return next.handle(req);
  }
}
