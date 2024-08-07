import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { getFormControl } from 'src/app/utils/form-helper';
import { FridgeIngredient } from 'src/app/shared/models/fridge';
import { MatIconModule } from '@angular/material/icon';
import { AsTypePipe } from 'src/app/shared/pipes/as-type.pipe';
import {
  ArrayParams,
  ControlType,
  TemplateFormBuilder,
  TemplateFormField,
} from 'src/app/shared/components/dynamic-form/template-form-field';
import { FridgeService } from 'src/app/services/fridge.service';
import { Ingredient } from 'src/app/shared/models/recipe';
import { DynamicFormComponent } from 'src/app/shared/components/dynamic-form/dynamic-form.component';
import { TemplateFormButton } from 'src/app/shared/components/dynamic-form/dynamic-form-buttons/dynamic-form-buttons.component';
import { ArrayAction } from 'src/app/shared/components/dynamic-form/dynamic-form-fields/dynamic-form-fields.component';

@Component({
  selector: 'app-add-ingredient-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatIconModule,
    AsTypePipe,
    DynamicFormComponent,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-ingredient-dialog.component.html',
  styleUrl: './add-ingredient-dialog.component.scss',
})
export class AddIngredientDialogComponent implements OnInit {
  @ViewChild(DynamicFormComponent) dynamicForm!: DynamicFormComponent<any>;
  ingredientsFormArray!: FormArray;
  protected readonly FormGroup!: FormGroup;

  fields!: TemplateFormField[];
  buttons!: TemplateFormButton[];

  protected readonly ArrayParams!: ArrayParams;

  constructor(
    public dialogRef: MatDialogRef<
      AddIngredientDialogComponent,
      FridgeIngredient
    >,
    public tfb: TemplateFormBuilder
  ) {}

  ngOnInit(): void {
    this.initTemplateForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCheck() {
    console.log(this.dynamicForm.fields);
    this.dynamicForm.onArrayChanged({
      action: ArrayAction.ADD,
      field: this.fields[0] as unknown as TemplateFormField<ControlType.ARRAY>,
      formGroup: this.dynamicForm.formGroup,
    });
  }

  initTemplateForm() {
    this.fields = this.tfb.fields({
      hello: this.tfb.array([
        this.tfb.group({
          ingredient: this.tfb.group<Ingredient>({
            name: this.tfb.text({
              visible: true,
              validators: [Validators.required],
              params: { label: 'Ingredient' },
            }),
          }),
          quantity: this.tfb.text({
            visible: true,
            validators: [Validators.required],
            params: {
              label: 'Quantity',
              type: 'number',
            },
          }),
          unit: this.tfb.select({
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
                ],
                displayProp: 'display',
                valueProp: 'value',
              },
            },
          }),
          expirationDate: this.tfb.date({
            visible: true,
            params: { label: 'Expiration Date' },
          }),
        }),
      ]),
    });

    this.buttons = [
      {
        text: 'Submit',
        type: 'button',
        onClick: (_, form) => {
          console.log(form.value);
        },
      },
    ];
  }

  onSubmit(): void {
    console.log(this.dynamicForm.formGroup.value);
    console.log(this.dynamicForm.formGroup.valid);
    this.dialogRef.close(this.dynamicForm.formGroup.value['hello']);
  }

  hasError(idx: number, err: string, controlName: string): boolean {
    return getFormControl(
      this.ingredientsFormArray.at(idx) as FormGroup,
      controlName
    ).hasError(err);
  }

  onAdd() {
    this.dynamicForm.onArrayChanged({
      action: ArrayAction.ADD,
      field: this.fields[0] as unknown as TemplateFormField<ControlType.ARRAY>,
      formGroup: this.dynamicForm.formGroup,
    });
  }

  onDelete() {
    this.dynamicForm.onArrayChanged({
      action: ArrayAction.REMOVE,
      field: this.fields[0] as unknown as TemplateFormField<ControlType.ARRAY>,
      formGroup: this.dynamicForm.formGroup,
    });
  }
}
