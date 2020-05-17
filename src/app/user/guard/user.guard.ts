import { EncdecService } from './../../common/encryption/encdec.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate, CanLoad {
  constructor(private encdecservice: EncdecService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (localStorage.getItem('role') != null) {
        const role = this.encdecservice.decrypt(localStorage.getItem('role'), '');
        if (role === 'User') {
          return true;
        } else {
          this.navigationtoLogin(state);
        }
      } else {
        this.navigationtoLogin(state);
      }
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
  navigationtoLogin(state: RouterStateSnapshot) {
    this.router.navigate(['/login'], { queryParams: {returnUrl: state.url}});
  }
}
