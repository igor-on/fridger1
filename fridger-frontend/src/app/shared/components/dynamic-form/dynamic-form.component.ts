import { Component, Input, OnInit } from '@angular/core';
import {
  ControlType,
  GroupParams,
  TemplateFormField,
} from './template-form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormFieldsComponent } from './dynamic-form-fields/dynamic-form-fields.component';
import {
  DynamicFormButtonsComponent,
  TemplateFormButton,
} from './dynamic-form-buttons/dynamic-form-buttons.component';

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

  addFormControls(
    fields: TemplateFormField<T>[],
    formGroup: FormGroup = this.formGroup
  ) {
    for (let field of fields) {
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
}
