import { ResolveFn } from '@angular/router';
import { UserDTO } from '../models/user.dto';
import { inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { concatMap, EMPTY } from 'rxjs';
import { AuthUser } from '../models/auth-user.model';
import { SafeUrl } from '@angular/platform-browser';

export const userResolver: ResolveFn<UserDTO> = (route, state) => {
  const userSvc = inject(UserService);

  return userSvc.authUser.pipe(
    concatMap((authUser: AuthUser | undefined) => {
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

  return userSvc.authUser.pipe(
    concatMap((authUser: AuthUser | undefined) => {
      if (!authUser) {
        return EMPTY;
      }

      return userSvc.getUserProfilePicture(authUser.username);
    })
  );
};

export const resolveUserDetails = {
  user: userResolver,
  userProfPic: userProfilePictureResolver,
};
