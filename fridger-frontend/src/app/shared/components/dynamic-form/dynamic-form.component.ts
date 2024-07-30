import { Component, Input, OnInit } from '@angular/core';
import {
  ArrayParams,
  ControlType,
  GroupParams,
  TemplateFormField,
  TemplateFormFieldBuilder,
} from './template-form-field';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  ArrayAction,
  DynamicFormFieldsComponent,
} from './dynamic-form-fields/dynamic-form-fields.component';
import {
  DynamicFormButtonsComponent,
  TemplateFormButton,
} from './dynamic-form-buttons/dynamic-form-buttons.component';
import * as _ from 'lodash';
import { DynamicFormHelper } from 'src/app/utils/form-helper';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DynamicFormFieldsComponent,
    DynamicFormButtonsComponent,
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent<T extends ControlType> implements OnInit {
  @Input({ required: true }) fields!: TemplateFormField<T>[];
  @Input({ required: true }) buttons!: TemplateFormButton[];

  formGroup!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.fb.group({});
    this.addFormControls(this.fields);
  }

  onArrayChanged(data: {
    action: ArrayAction;
    field: TemplateFormField<ControlType.ARRAY>;
    formGroup: FormGroup;
  }) {
    const formArrayField = data.field;
    const formArray: FormArray = data.formGroup.get(
      formArrayField.name
    ) as FormArray;

    if (data.action === ArrayAction.ADD) {
      let newElement = _.cloneDeep(formArrayField.params!.elements[0]);
      DynamicFormHelper.reduceNestedArrayElements(newElement);

      this.populateFormArray(newElement, formArray);
      formArrayField.params!.elements.push(newElement);
    } else if (data.action === ArrayAction.REMOVE) {
      if (formArray.length == 1) return;

      formArray.removeAt(-1);
      formArrayField.params?.elements.pop();
    }
  }

  addFormControls(
    fields: TemplateFormField<T>[],
    formGroup: FormGroup = this.formGroup
  ) {
    for (let field of fields) {
      if (field.controlType === ControlType.ARRAY) {
        const array = this.fb.array([]);
        formGroup.addControl(field.name, array);

        for (let el of (field.params as ArrayParams).elements) {
          this.populateFormArray(el, formGroup.get(field.name) as FormArray);
        }
      }

      if (field.controlType !== ControlType.GROUP) {
        formGroup.addControl(
          field.name,
          this.fb.control(field.value ?? '', {
            validators: field.validators ?? [],
          })
        );
      }

      if (field.onChange !== undefined) {
        formGroup.get(field.name)?.valueChanges.subscribe(value => {
          field.onChange!(value, this.formGroup);
        });
      }

      if (field.controlType === ControlType.GROUP) {
        const nestedGroup = this.fb.group({});
        formGroup.addControl(field.name, nestedGroup);
        this.addFormControls((field.params as GroupParams).fields, nestedGroup);
      }
    }
  }

  populateFormArray(
    element: TemplateFormFieldBuilder<ControlType.GROUP>,
    formArray: FormArray
  ) {
    const nestedArrGroup = this.fb.group({});
    this.addFormControls(
      (element.params as GroupParams).fields,
      nestedArrGroup
    );
    formArray.push(nestedArrGroup);
  }
}
