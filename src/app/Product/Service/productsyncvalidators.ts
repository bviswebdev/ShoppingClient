import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export const fileFormatValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  if (control.value && control.value.name) {
    const ext = control.value.name.substring(
      control.value.name.lastIndexOf('.') + 1
    );
    if (
      ext.toLowerCase() == 'png' ||
      ext.toLowerCase() == 'jpg' ||
      ext.toLowerCase() == 'jpeg'
    ) {
      return null;
    } else {
      return { incorrectformat: true };
    }
  }
  return null;
};

export const fileSizeValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  if (control.value && control.value.size) {
    if (control.value.size < 1000000) {
      return null;
    } else {
      return { incorrectsize: true };
    }
  }

  return null;
};
