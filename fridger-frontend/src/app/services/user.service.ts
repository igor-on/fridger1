import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { empty, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = `${environment.apiUrl}/user`;

  constructor(private httpClient: HttpClient) {}

  getUserInfo() {
    // TODO: temporary solutin - create TokenService
    const token = localStorage.getItem('token');

    if (token) {
      const cred = jwtDecode<{
        sub: string;
        iat: number;
        exp: number;
      }>(localStorage.getItem('token')!);

      return this.httpClient.get(`${this.url}/${cred.sub}`);
    } else return null;
  }

  getUserProfilePicture(): Observable<any> {
    const token = localStorage.getItem('token');

    if (token) {
      const cred = jwtDecode<{
        sub: string;
        iat: number;
        exp: number;
      }>(localStorage.getItem('token')!);

      return this.httpClient.get<Blob>(
        `${this.url}/${cred.sub}/profilePicture`,
        { responseType: 'blob' as 'json' } // TS...
      );
    }
    return empty();
  }
}
