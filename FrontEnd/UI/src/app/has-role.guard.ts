import { Injectable } from '@angular/core';
import { AuthService } from "./service/auth.service";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {
 
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
      const isLoggedIn = this.authService.isLoggedIn();      
      if (isLoggedIn) {
        return true;
      } else {
        this.router.navigate(['']);
        return false;
      }
  }
}
