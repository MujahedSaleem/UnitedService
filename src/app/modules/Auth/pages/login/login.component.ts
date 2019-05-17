import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoggerService } from 'src/app/core/services/logger.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { UserAuthService } from 'src/app/core/services/user-auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  private subscriptions: Subscription[] = [];
  private returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private alertService: LoggerService,
    private loadingService: LoadingService,
    private auth: UserAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    if (this.auth.isUserSignedIn()) {
      this.router.navigate(['/']);
    }
  }

  private createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  public submit(): void {
    if (this.loginForm.valid) {
      this.loadingService.isLoading.next(true);
      const { email, password } = this.loginForm.value;

      // TODO call the auth service
      this.subscriptions.push(
        this.auth.SignIn(email, password).subscribe(success => {
          if (success) {
            this.router.navigateByUrl(this.returnUrl).finally(() => {
              setTimeout(() => {
                location.reload();
              }, 200)
            });
          } else {
            this.displayFailedLogin();
          }
          this.loadingService.isLoading.next(false);
        })
      );
    } else {
      this.loadingService.isLoading.next(false);
      this.displayFailedLogin();
    }
  }
  fbAuth() {
    this.auth.FacebookAuth();
  }
  twitAuth() {

  }
  gooAuth() {
    this.auth.GoogleAuth().subscribe(success => {
      if (success) {
        this.ngZone.run(() => {
          this.router.navigateByUrl(this.returnUrl).finally(() => {
            location.reload();
          });
        });
      } else {
        this.displayFailedLogin();
      }
      this.loadingService.isLoading.next(false);
    }
    );

  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private displayFailedLogin(): void {
    this.alertService.showSnackBar('Invalid email/password combination, try again.');
  }

}
