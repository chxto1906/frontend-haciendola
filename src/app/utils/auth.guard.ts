import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

    if (userService.isAuth.value == false) {
        router.navigate(['/login']);
        return false;
    }

    return userService.isAuth.value;
};
