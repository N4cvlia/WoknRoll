import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let cookies = inject(CookieService);

  const auth = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${cookies.get("User")}`)
  })

  return next(auth);
};
