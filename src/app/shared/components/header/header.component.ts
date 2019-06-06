import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { isPlatformBrowser } from "@angular/common";
import { Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { LoggerService } from "src/app/core/services/logger.service";
import { UserAuthService } from "src/app/core/services/user-auth.service";
import { UserUtilsService } from "src/app/core/services/user-utils.service";
import { User } from "src/app/modules/users/shared/user.model";
import { APP_CONFIG } from "../../../configs/app.config";
import { ProgressBarService } from "../../../core/services/progress-bar.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})

export class HeaderComponent implements OnInit {

  public selectedLanguage: string;
  public progressBarMode: string;
  public currentUrl: string;
  public user: User;
  public languages: any[];
  public currentState: boolean;
  public isHandset$: Observable<boolean>;
  private readonly notifier: NotifierService;
  constructor(@Inject(APP_CONFIG) public appConfig: any,
              private progressBarService: ProgressBarService,
              private router: Router,
              notifierService: NotifierService,

              private breakpointObserver: BreakpointObserver,
              public userAuth: UserAuthService,
              private Logger: LoggerService,
              private userService: UserUtilsService,
              private activatedRoute: ActivatedRoute,
              @Inject(PLATFORM_ID) private platformId: Object) {
    this.notifier = notifierService;

    this.languages = [{ name: "en", label: "English" }, { name: "es", label: "Español" }];
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map((result) => result.matches),
      );
  }

  public ngOnInit() {
    if (this.userAuth.isUserSignedIn()) {
      this.userService.getFollowerName(this.userAuth.currentUser.value.uid).subscribe((data) => {

        data.forEach((x) => {
          // if (x.state !== 'removed') {
          //   this.Logger.showSnackBar(`${x.name} Dislike you `);

          // } else
          if (x.state === "added") {
            this.Logger.showSnackBar(`${x.name} like you `);

          }
        });
      });
    }

    if (isPlatformBrowser(this.platformId)) {
      this.selectedLanguage = localStorage.getItem("language") || "en";
    }

    this.progressBarService.updateProgressBar$.subscribe((mode: string) => {
      this.progressBarMode = mode;
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
    if (this.userAuth.isUserSignedIn()) {
      this.currentState = false;
    }

  }

  public changeLanguage(language: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("language", language);
    }
    this.selectedLanguage = language;
  }
  public logout() {
    if (this.userAuth.isUserSignedIn()) {
      this.userAuth.SignOut();
      this.router.navigate(["/"]);
    }
  }
  public login() {
    this.router.navigate(["/auth/login"]);
  }

  public loggedIn() {
    return this.userAuth.isUserSignedIn();
  }
}
