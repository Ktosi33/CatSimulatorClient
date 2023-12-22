import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
   const token = inject(TokenService).getToken();
   const router: Router = inject(Router);
   if(token)
   {
    return true;
   } else {
    router.navigate(['/'], { queryParams: { returnUrl: state.url } })
    return false;
   }
};
