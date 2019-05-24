import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/modules/users/shared/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserAuthService } from 'src/app/core/services/user-auth.service';
import { Router } from '@angular/router';
import { CustomValidators } from '../../Validators/CustomValidators';
import { UserUtilsService } from 'src/app/core/services/user-utils.service';
import { Subscription } from 'rxjs';
import { LoggerService } from 'src/app/core/services/logger.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  private subscriptions: Subscription[] = [];

  model: User;
  reactiveRadio = 'd';
  @Output() cancelRegsiter = new EventEmitter();
  registerModel: FormGroup;
  constructor(private fb: FormBuilder,
    private Authservice: UserAuthService,
    private alertService: LoggerService,
    private loadingService: LoadingService,

    private route: Router, private userUtiles: UserUtilsService) { }
  ngOnInit() {
    this.createRegisterForm();
  }
  cancel() {
    this.cancelRegsiter.emit(false);
  }
  createRegisterForm() {
    this.registerModel = this.fb.group(
      {
        displayName: [null, Validators.required],
        familyName: [null, Validators.required],
        email: [
          null,
          Validators.compose([
            Validators.required,
            CustomValidators.patternValidator(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, {
              IsValid: true
            })
          ])
        ],
        passwrod: [null, Validators.required],
        confirmPassword: ["", Validators.required],
        gender: ["", Validators.required]
      },
      { validators: CustomValidators.matchPassword }
    );
  }

  register() {
    if (this.registerModel.valid) {
      const user: User = new User({ ...this.registerModel.value });
      // TODO call the auth service
      this.subscriptions.push(
        this.Authservice.SignUp(user, this.registerModel.value.passwrod).subscribe(success => {
          if (success) {
            this.Authservice.SignIn(user.email, this.registerModel.value.passwrod).subscribe((success) => {
              if (success) {
                this.userUtiles.createUser(user).finally(() => {
                  this.route.navigate(['/']);

                })
              } else {
                this.alertService.showSnackBar(success);
              }
            });
          } else {
            this.alertService.showSnackBar(success);
          }

          this.loadingService.isLoading.next(false);
        }, () => { this.subscriptions.forEach(x => x.unsubscribe()) })
      );
    } else {

      this.alertService.showSnackBar('Please enter a valid name, email and password, try again.');
    }

  }
}
