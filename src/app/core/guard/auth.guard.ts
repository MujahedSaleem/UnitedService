import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { of } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { LoggerService } from "../services/logger.service";
import { UserAuthService } from "../services/user-auth.service";
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private atuhService: UserAuthService, private router: Router, private alertfy: LoggerService) { }
  public canActivate(): boolean {
    if (this.atuhService.isUserSignedIn() && !this.atuhService.isUserAnny()) {
      return true;
    }

    this.alertfy.showSnackBar("You shall not Pass !!!!");
    this.router.navigate(["/home"]);
    return false;
  }
}
