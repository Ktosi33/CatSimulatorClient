import { Injectable, OnInit, inject, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { JwtPayload, jwtDecode  }from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class TokenService{
  private tokenKey = 'access_token';
  private cookieService = inject(CookieService)
  public isLogged = signal(false)

  getToken(): string | null {
    const cookieValue =  this.cookieService.get(this.tokenKey)
    return cookieValue
  }
  getDecodedToken() : JwtPayload {
    const token = this.getToken()

    const decodedToken = jwtDecode(token as string);
    console.log(decodedToken);

    return decodedToken;
  }
  setToken(value: string, expirationDays: number): void {
    const date = new Date();
    date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${this.tokenKey}=${value}; ${expires}; path=/`;
    this.isLogged.set(true);
  }

  removeToken(): void {
    document.cookie = `${this.tokenKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    this.isLogged.set(false);
  }
}
