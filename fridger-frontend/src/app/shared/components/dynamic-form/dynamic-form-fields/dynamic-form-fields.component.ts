import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
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
  }
  @Input() flexDirection: 'horizontal' | 'vertical' = 'horizontal';
  @Input({ required: true }) formGroup!: FormGroup;
  @Input({ required: true }) fields!: TemplateFormField<T>[];
  @Output() addToArrayClicked = new EventEmitter<{
    field: TemplateFormField<ControlType.ARRAY>;
    formGroup: FormGroup;
  }>();
  ControlType = ControlType;
  protected readonly FormGroup!: FormGroup;
  protected readonly FormArray!: FormArray;
  protected readonly TextParams!: TextParams;
  protected readonly GroupParams!: GroupParams;
  protected readonly SelectParams!: SelectParams;
  protected readonly DateParams!: DateParams;
  protected readonly ArrayParams!: ArrayParams;
  protected readonly ComponentParams!: ComponentParams<any>;

  public addToArray(arrayField: TemplateFormField<any>) {
    let array = arrayField as TemplateFormField<ControlType.ARRAY>;
    console.log('addToArrat');
    this.addToArrayClicked.emit({ field: array, formGroup: this.formGroup });
    // (this.formGroup.get(arrayField.name) as FormArray).push(
    //   new FormGroup({
    //     name: new FormControl(' '),
    //   })
    // );

    // (this.formGroup.get(arrayField.name) as FormArray).at((this.formGroup.get(arrayField.name) as FormArray).length - 1).get('name')?.valueChanges.subscribe()

    // array.params?.elements.push(
    //   this.tfb.group({
    //     name: this.tfb.text({
    //       params: {
    //         label: 'ARRAY hello',
    //         type: 'text',
    //       },
    //       visible: true,
    //       onChange: (value, form) => {
    //         console.log('My first text array changed!: ', value);
    //       },
    //     }),
    //   })
    // );
  }
}
