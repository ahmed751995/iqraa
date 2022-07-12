import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,
	 RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private router: Router ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authenticationService.isLoggedin().then(resp => {
      if(resp) return true;
      else {
	this.router.navigate(['/login']);
	return false;
      }
    })
  }
  
}
