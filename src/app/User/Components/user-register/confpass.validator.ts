import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export const identityRevealedValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const pass = control.get('password');
  const confirmpass = control.get('confirmpassword');
  const errObj = { mismatch: true };
  if (pass && confirmpass && pass.value !== confirmpass.value) {
    confirmpass.setErrors(errObj);
    return errObj;
  } else {
    return null;
  }
};
