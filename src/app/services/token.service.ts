import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenKey = 'access_token';
  private cookieService = inject(CookieService)
  getToken(): string | null {

    const cookieValue =  this.cookieService.get(this.tokenKey)
    return cookieValue
  }

  setToken(value: string, expirationDays: number): void {
    const date = new Date();
    date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${this.tokenKey}=${value}; ${expires}; path=/`;
  }

  removeCookie(name: string): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}
