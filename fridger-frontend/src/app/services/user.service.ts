import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import {
  BehaviorSubject,
  empty,
  map,
  Observable,
  of,
  ReplaySubject,
  Subject,
  tap,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDTO } from '../shared/models/user.dto';
import { TokenService } from './token.service';
import { AuthUser } from '../shared/models/auth-user.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { co } from '@fullcalendar/core/internal-common';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = `${environment.apiUrl}/user`;

  public authUser = new BehaviorSubject<AuthUser | undefined>(undefined);
  public profilePictureChanged = new Subject<SafeUrl>();

  private _imgUrl?: string;

  constructor(
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  getUserDetails(username: string): Observable<UserDTO> {
    return this.httpClient.get<UserDTO>(`${this.url}/${username}`);
  }

  getUserProfilePicture(username: string): Observable<SafeUrl> {
    if (!this._imgUrl) {
      console.log('Fetching image from BE');
      return this.httpClient
        .get<Blob>(
          `${this.url}/${username}/profilePicture`,
          { responseType: 'blob' as 'json' } // TS...
        )
        .pipe(
          map((blob: Blob) => {
            if (!this._imgUrl) {
              // Double check to make sure that multiple observable called in parallel don't create multiple object URLs
              this._imgUrl = URL.createObjectURL(blob);
            }
            return this.sanitizer.bypassSecurityTrustUrl(this._imgUrl);
          })
        );
    } else {
      console.log('Returning cached image');
      return of(this.sanitizer.bypassSecurityTrustUrl(this._imgUrl));
    }
  }

  uploadUserProfilePicture(username: string, file: File): Observable<SafeUrl> {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient
      .post<Blob>(`${this.url}/${username}/profilePicture/upload`, formData, {
        responseType: 'blob' as 'json',
      })
      .pipe(
        tap(() => {
          if (this._imgUrl) {
            URL.revokeObjectURL(this._imgUrl);
          }
        }),
        map((blob: Blob) => {
          this._imgUrl = URL.createObjectURL(blob);
          return this.sanitizer.bypassSecurityTrustUrl(this._imgUrl);
        }),
        tap((imgUrl: SafeUrl) => {
          this.profilePictureChanged.next(imgUrl);
        })
      );
  }

  updateUser(user: UserDTO) {
    return this.httpClient.put<UserDTO>(`${this.url}/${user.username}`, user);
  }
}
