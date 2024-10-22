import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import {
  BehaviorSubject,
  empty,
  Observable,
  ReplaySubject,
  Subject,
  tap,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDTO } from '../shared/models/user.dto';
import { TokenService } from './token.service';
import { AuthUser } from '../shared/models/auth-user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = `${environment.apiUrl}/user`;

  public authUser = new BehaviorSubject<AuthUser | undefined>(undefined);

  constructor(private httpClient: HttpClient) {}

  getUserDetails(username: string): Observable<UserDTO> {
    return this.httpClient.get<UserDTO>(`${this.url}/${username}`);
  }

  getUserProfilePicture(username: string): Observable<any> {
    return this.httpClient.get<Blob>(
      `${this.url}/${username}/profilePicture`,
      { responseType: 'blob' as 'json' } // TS...
    );
  }
}
