import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const loggedGuard: CanActivateFn = (route, state) => {
  const token = inject(TokenService).getToken();
  const router: Router = inject(Router);
  if(token)
  {
   router.navigate(['/home'], { queryParams: { returnUrl: state.url } })
   return false;
  } else {
   return true;
  }
};
