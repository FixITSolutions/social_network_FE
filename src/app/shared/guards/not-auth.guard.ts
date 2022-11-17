import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivate {
  constructor (
    private authService : AuthService,
    private router : Router
  ) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isAuth = this.authService.isAuth();
   if(isAuth){
    this.router.navigateByUrl('/wall');
  }
    return !isAuth;
  }
}