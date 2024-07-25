import { FormControl, FormGroup } from '@angular/forms';

export function getFormControl<T>(
  formGroup: FormGroup,
  controlName: string
): any {
  return formGroup.get(controlName) as FormControl<T>;
}
