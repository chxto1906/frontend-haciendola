
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';


export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
  try {
  
    const userService = inject(UserService)
    const errorService = inject(ErrorService)
    const token = userService.isLogged();
    if (!req.url.includes('login')) {
      if (token) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    }
    
    return next(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          errorService.msjError(err);
          userService.logOut();
        }
        return throwError(() => err);
      })
    );
  } catch (error) {
    console.log('error', error)
    return throwError(() => new HttpErrorResponse({ error: 'Error en el servidor', status: 500 }));
  }

  
};