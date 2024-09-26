import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DynamicFormComponent } from 'src/app/shared/components/dynamic-form/dynamic-form.component';
import {
  TemplateFormBuilder,
  TemplateFormField,
} from 'src/app/shared/components/dynamic-form/template-form-field';
import { UpdateIngredientDialogComponent } from '../../fridge/update-ingredient-dialog/update-ingredient-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-add-groceries',
  standalone: true,
  imports: [
    MatDialogModule,
    DynamicFormComponent,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-groceries.component.html',
  styleUrl: './add-groceries.component.scss',
})
export class AddGroceriesComponent implements OnInit {
  @ViewChild('form') form!: DynamicFormComponent<any>;
  public fields!: TemplateFormField[];

  constructor(
    public dialogRef: MatDialogRef<UpdateIngredientDialogComponent>,
    public tfb: TemplateFormBuilder
  ) {}

  ngOnInit(): void {
    this.initTemplateForm();
  }

  initTemplateForm() {
    this.fields = this.tfb.fields({
      range: this.tfb.daterange({
        params: {
          label: 'Enter date range',
        },
      }),
      withFridge: this.tfb.checkbox({
        params: {
          label: "Include fridge's ingredients",
        },
        value: false,
      }),
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
