import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noWhitespaceValidator(
  control: AbstractControl
): ValidationErrors | null {
  const isValid =
    (<string>control.value).length == 0 ||
    (<string>control.value).trim().length !== 0;
  return isValid ? null : { whitespace: true };
}
