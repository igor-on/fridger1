import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { JwtClaims } from '../shared/models/jwt-claims.model';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  getJwtToken(): string | undefined {
    const jwt = localStorage.getItem('token');
    if (!jwt) return undefined;

    return jwt;
  }

  getJwtClaims(jwt = this.getJwtToken()): JwtClaims | undefined {
    if (!jwt) return undefined;

    const claims = jwtDecode<{
      sub: string;
      iat: number;
      exp: number;
    }>(jwt);
    return claims;
  }

  getUsername(): string | undefined {
    const claims = this.getJwtClaims();
    if (!claims) return undefined;
    return claims.sub;
  }
}
