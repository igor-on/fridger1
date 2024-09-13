import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { of } from 'rxjs';
import { DynamicFormComponent } from 'src/app/shared/components/dynamic-form/dynamic-form.component';
import {
  TemplateFormBuilder,
  TemplateFormField,
} from 'src/app/shared/components/dynamic-form/template-form-field';
import { FridgeIngredient } from 'src/app/shared/models/fridge';

@Component({
  selector: 'app-update-ingredient-dialog',
  standalone: true,
  imports: [DynamicFormComponent, MatDialogModule],
  templateUrl: './update-ingredient-dialog.component.html',
  styleUrl: './update-ingredient-dialog.component.scss',
})
export class UpdateIngredientDialogComponent implements OnInit {
  @ViewChild(DynamicFormComponent) dynamicForm!: DynamicFormComponent<any>;
  fields!: TemplateFormField[];

  afterOpeningExpirationDateVisible!: boolean;

  constructor(
    public dialogRef: MatDialogRef<UpdateIngredientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FridgeIngredient,
    public tfb: TemplateFormBuilder
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.afterOpeningExpirationDateVisible = this.data.open;

    this.initTemplateForm();
  }

  onNoThanks(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.dynamicForm.formGroup.value);
  }

  initTemplateForm() {
    this.fields = this.tfb.fields({
      id: this.tfb.text({
        value: this.data.id,
        visible: false,
      }),
      quantity: this.tfb.text({
        value: this.data.quantity,
        validators: [Validators.required, Validators.min(0)],
        params: { label: 'Quantity', type: 'number' },
        visible: true,
      }),
      unit: this.tfb.select({
        value: this.data.unit,
        visible: true,
        params: {
          label: 'Unit',
          options: {
            data: [
              { value: 'KG', display: 'kilogram' },
              {
                value: 'G',
                display: 'gram',
              },
              { value: 'ML', display: 'mililiter' },
              { value: 'PCS', display: 'pieces' },
            ],
            displayProp: 'display',
            valueProp: 'value',
          },
        },
      }),
      expirationDate: this.tfb.date({
        value: this.data.expirationDate,
        visible: true,
        params: { label: 'Expiration Date' },
      }),
      open: this.tfb.checkbox({
        visible: true,
        // tip: {
        //   message: 'Include ingredients from fridge',
        //   position: 'above',
        // },
        params: {
          label: 'Is Open',
        },
        value: this.data.open,
        onChange: (value: boolean) => {
          console.log(value);
          this.afterOpeningExpirationDateVisible = value;
        },
      }),
      afterOpeningExpirationDate: this.tfb.date({
        value: this.data.afterOpeningExpirationDate,
        visible: (form: FormGroup) => of(form.get('open')?.value ?? false),
        params: { label: 'After Opening Expiration Date' },
      }),
    });
  }
}
