import { ValidationErrors, ValidatorFn, AbstractControl } from "@angular/forms";

export class CustomValidators {
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }

      const valid = regex.test(control.value);

      return valid ? null : error;
    };
  }

  static matchPassword(control: AbstractControl) {
    const password = control.get("passwrod").value;
    const confirmedPassword = control.get("confirmPassword").value;

    if (password !== confirmedPassword) {
      control.get("confirmPassword").setErrors({ NoMatchPassword: true });
    }
  }
}
