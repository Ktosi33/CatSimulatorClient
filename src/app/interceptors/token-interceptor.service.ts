import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { DOCUMENT } from '@angular/common';
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  private tokenService = inject(TokenService)
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let token =  this.tokenService.getToken()
    if (token && token !== "") {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request);
  }
}

