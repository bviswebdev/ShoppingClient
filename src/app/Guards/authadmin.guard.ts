import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/GlobalService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthadminGuard
  implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad
{
  constructor(private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('Activate Guard');
    this.authService.getAuthFromSessionStorage();
    console.log(this.authService.AuthObj);
    if (this.authService.IsAuthenticated && this.authService.IsAdmin) {
      return true;
    }
    return false;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('Activate Child Guard');
    this.authService.getAuthFromSessionStorage();
    console.log(this.authService.AuthObj);
    if (this.authService.IsAuthenticated && this.authService.IsAdmin) {
      return true;
    }

    return false;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('Lazy load Guard');
    this.authService.getAuthFromSessionStorage();
    console.log(this.authService.AuthObj);
    if (this.authService.IsAuthenticated && this.authService.IsAdmin) {
      return true;
    }
    return false;
  }
}
