import { ResolveFn } from '@angular/router';
import { UserDTO } from '../models/user.dto';
import { inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { concatMap, EMPTY, map } from 'rxjs';
import { AuthUser } from '../models/auth-user.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

export const userResolver: ResolveFn<UserDTO> = (route, state) => {
  const userSvc = inject(UserService);

  return userSvc.authUser.pipe(
    concatMap((authUser: AuthUser | undefined) => {
      console.log(authUser);
      if (!authUser) {
        return EMPTY;
      }

      return userSvc.getUserDetails(authUser.username);
    })
  );
};
export const userProfilePictureResolver: ResolveFn<SafeUrl> = (
  route,
  state
) => {
  const userSvc = inject(UserService);
  const sanitizer = inject(DomSanitizer);

  return userSvc.authUser.pipe(
    concatMap((authUser: AuthUser | undefined) => {
      console.log(authUser);
      if (!authUser) {
        return EMPTY;
      }

      return userSvc.getUserProfilePicture(authUser.username).pipe(
        map((blob: Blob) => {
          const objectURL = URL.createObjectURL(blob);
          return sanitizer.bypassSecurityTrustUrl(objectURL);
        })
      );
    })
  );
};
