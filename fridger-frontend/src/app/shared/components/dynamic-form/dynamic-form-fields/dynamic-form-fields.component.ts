import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  ControlType,
  TemplateFormField,
  TextParams,
  GroupParams,
  SelectParams,
  DateParams,
  ComponentParams,
} from '../template-form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AsTypePipe } from 'src/app/shared/pipes/as-type.pipe';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ToObservablePipe } from 'src/app/shared/pipes/to-observable.pipe';
import { provideNativeDateAdapter } from '@angular/material/core';

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
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dynamic-form-fields.component.html',
  styleUrl: './dynamic-form-fields.component.scss',
})
export class DynamicFormFieldsComponent<T extends ControlType>
  implements OnInit
{
  ngOnInit(): void {
    console.log(this.fields);
  }
  @Input({ required: true }) formGroup!: FormGroup;
  @Input({ required: true }) fields!: TemplateFormField<T>[];
  ControlType = ControlType;
  protected readonly TextParams!: TextParams;
  protected readonly GroupParams!: GroupParams;
  protected readonly SelectParams!: SelectParams;
  protected readonly DateParams!: DateParams;
  protected readonly ComponentParams!: ComponentParams<any>;
}
