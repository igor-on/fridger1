import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const userSvc = inject(UserService);

  return userSvc.authUser.pipe(
    map(user => {
      const isAuth = !!user;
      if (isAuth) {
        return true;
      }

      return router.createUrlTree(['/login']);
    })
  );
};
