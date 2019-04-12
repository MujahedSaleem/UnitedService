import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { map, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserAuthService } from '../services/user-auth.service';
import { of } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private auth: UserAuthService,
    private router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

    return of(this.auth.isUserSignedIn())
  .pipe(
        take(1),
        map((currentUser) => !!currentUser),
        tap((loggedIn) => {
          if (!loggedIn) {
            // this.alertService.alerts.next(new Alert('You must be logged in to access that page.', AlertType.Danger));
            this.router.navigate(['/auth/login'], {queryParams: { returnUrl: state.url }});
          }
        })
      )
  }
}