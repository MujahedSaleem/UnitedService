import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { map, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserAuthService } from '../services/user-auth.service';
import { of } from 'rxjs';
import { LoggerService } from '../services/logger.service';
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private atuhService: UserAuthService, private router: Router, private alertfy: LoggerService) { }
  canActivate(): boolean {
    if (this.atuhService.isUserSignedIn() && !this.atuhService.isUserAnny()) {
      return true;
    }

    this.alertfy.showSnackBar('You shall not Pass !!!!');
    this.router.navigate(['/home']);
    return false;
  }
}