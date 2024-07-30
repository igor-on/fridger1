import { FormArray, FormControl, FormGroup } from '@angular/forms';
import {
  ArrayParams,
  ControlType,
  TemplateFormField,
  TemplateFormFieldBuilder,
} from '../shared/components/dynamic-form/template-form-field';

export function getFormControl<T>(
  formGroup: FormGroup,
  controlName: string
): any {
  return formGroup.get(controlName) as FormControl<T>;
}

export abstract class DynamicFormHelper {
  /**
   *
   * @param group - array element
   *
   * @description this method will ensure that nested arrays in formArray will be initialized with only one element
   */
  public static reduceNestedArrayElements(
    group:
      | TemplateFormField<ControlType.GROUP>
      | TemplateFormFieldBuilder<ControlType.GROUP>
  ) {
    for (let field of group.params!.fields) {
      if (field.controlType === ControlType.ARRAY) {
        (field.params as ArrayParams).elements = [
          (field.params as ArrayParams).elements[0],
        ];
      }
      if (field.controlType === ControlType.GROUP) {
        this.reduceNestedArrayElements(field);
      }
    }
  }
}
