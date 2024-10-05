import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']); // Redirige al login si no está autenticado
      return false;
    }
  }


  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): boolean {
  //   const isLoggedIn = this.authService.isLoggedIn(); 

  //   if (isLoggedIn) {
  //     return true;
  //   } else {
  //     this.router.navigate(['/register']); 
  //     return false;
  //   }
  // }
}






























// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//     if (this.authService.isLogged()) {
//       return true;
//     } else {
//       this.router.navigate(['/login']); 
//       return false;
//     }
//   }
// }





// import { CanActivateFn, Router } from '@angular/router';
// import { AuthService } from '../services/auth.service'; 
// import { inject } from '@angular/core';

// export const authGuard: CanActivateFn = (route, state) => {
//   const authService = inject(AuthService);
//   const router = inject(Router);
//   if (authService.isLoggedIn()) {
//     return true;
//   } else {
//     router.navigate(['login'], { queryParams: { returnUrl: state.url } });
//     return false;
//   }
// };