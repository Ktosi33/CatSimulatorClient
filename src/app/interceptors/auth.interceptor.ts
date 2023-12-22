import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  let token =  document.cookie
      .split('; ')
      .find(row => row.startsWith(name + '='));

  token = token ? token.split('=')[1] : undefined;

  if (token && token !== "") {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req);
};
