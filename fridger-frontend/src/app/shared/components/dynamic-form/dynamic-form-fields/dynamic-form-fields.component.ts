import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  ControlType,
  TemplateFormField,
  TextParams,
  GroupParams,
  SelectParams,
  DateParams,
  ComponentParams,
  ArrayParams,
  TemplateFormBuilder,
} from '../template-form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AsTypePipe } from 'src/app/shared/pipes/as-type.pipe';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ToObservablePipe } from 'src/app/shared/pipes/to-observable.pipe';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FieldVisiblePipe } from 'src/app/shared/pipes/field-visible.pipe';

export enum ArrayAction {
  ADD,
  REMOVE,
}

@Component({
  selector: 'app-dynamic-form-fields',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    AsTypePipe,
    ReactiveFormsModule,
    MatSelectModule,
    ToObservablePipe,
    AsyncPipe,
    MatDatepickerModule,
    MatButtonModule,
    CommonModule,
    MatCheckboxModule,
    MatTooltipModule,
    FieldVisiblePipe,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dynamic-form-fields.component.html',
  styleUrl: './dynamic-form-fields.component.scss',
})
export class DynamicFormFieldsComponent<T extends ControlType>
  implements OnInit
{
  constructor(private tfb: TemplateFormBuilder) {}
  ngOnInit(): void {
    console.log(this.fields);
    console.log(this.formGroup);
  }
  @Input() flexDirection!: 'horizontal' | 'vertical';
  @Input({ required: true }) formGroup!: FormGroup;
  @Input({ required: true }) fields!: TemplateFormField<T>[];
  @Output() arrayChangedEvent = new EventEmitter<{
    field: TemplateFormField<ControlType.ARRAY>;
    formGroup: FormGroup;
    action: ArrayAction;
  }>();
  ArrayAction = ArrayAction;
  ControlType = ControlType;
  protected readonly FormGroup!: FormGroup;
  protected readonly FormControl!: FormControl;
  protected readonly FormArray!: FormArray;
  protected readonly TextParams!: TextParams;
  protected readonly GroupParams!: GroupParams;
  protected readonly SelectParams!: SelectParams;
  protected readonly DateParams!: DateParams;
  protected readonly ArrayParams!: ArrayParams;
  protected readonly ComponentParams!: ComponentParams<any>;

  onNestedArrayChanged(data: {
    action: ArrayAction;
    field: TemplateFormField<ControlType.ARRAY>;
    formGroup: FormGroup;
  }) {
    this.arrayChanged(data.action, data.field, data.formGroup);
  }

  public arrayChanged(
    action: ArrayAction,
    arrayField: TemplateFormField<any>,
    formGroup: FormGroup = this.formGroup
  ) {
    let array = arrayField as TemplateFormField<ControlType.ARRAY>;
    this.arrayChangedEvent.emit({
      field: array,
      formGroup: formGroup,
      action: action,
    });
  }

  getErrorMessage(formField: AbstractControl): string {
    if (formField.hasError('required')) {
      return 'You must enter a value';
    } else if (formField.hasError('min')) {
      return `Minimum value is ${formField.errors!['min'].min}`;
    } else {
      return '';
    }
  }
}
