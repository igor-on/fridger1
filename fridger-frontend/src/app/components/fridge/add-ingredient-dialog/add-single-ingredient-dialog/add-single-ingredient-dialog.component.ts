import { JsonPipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { DynamicFormComponent } from 'src/app/shared/components/dynamic-form/dynamic-form.component';
import {
  TemplateFormBuilder,
  TemplateFormField,
} from 'src/app/shared/components/dynamic-form/template-form-field';
import { SimpleButtonComponent } from 'src/app/shared/components/simple-button/simple-button.component';
import { Icon } from 'src/app/shared/icons';
import { FridgeIngredient } from 'src/app/shared/models/fridge';
import { Ingredient } from 'src/app/shared/models/recipe';

@Component({
  selector: 'app-add-single-ingredient-dialog',
  standalone: true,
  imports: [
    DynamicFormComponent,
    MatDialogModule,
    ButtonComponent,
    SimpleButtonComponent,
    JsonPipe,
  ],
  templateUrl: './add-single-ingredient-dialog.component.html',
  styleUrl: './add-single-ingredient-dialog.component.scss',
})
export class AddSingleIngredientDialogComponent implements OnInit {
  protected readonly Icon = Icon;
  @ViewChild(DynamicFormComponent) form!: DynamicFormComponent<any>;

  @Output() closeClicked = new EventEmitter<void>();
  @Output() addClicked = new EventEmitter<FridgeIngredient>();
  @Output() updateClicked = new EventEmitter<{
    ingr: FridgeIngredient;
    ingrIdx: number;
  }>();

  @Input() ingredient?: FridgeIngredient;
  @Input() ingrIdx!: number;

  fields!: TemplateFormField[];
  editMode = false;

  constructor(private tfb: TemplateFormBuilder) {}

  ngOnInit(): void {
    this.editMode = !!this.ingredient;

    this.initTemplateForm();
  }

  initTemplateForm() {
    const name = this.ingredient?.ingredient.name;
    const quantity = this.ingredient?.quantity;
    const unit = this.ingredient?.unit;
    const expirationDate = this.ingredient?.expirationDate;

    this.fields = this.tfb.fields<FridgeIngredient>({
      ingredient: this.tfb.group<Ingredient>({
        name: this.tfb.text({
          visible: true,
          validators: [Validators.required],
          params: { label: 'Ingredient' },
          value: name,
        }),
      }),
      quantity: this.tfb.text({
        visible: true,
        validators: [Validators.required],
        params: {
          label: 'Quantity',
          type: 'number',
        },
        value: quantity,
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
              { value: 'PCS', display: 'pieces' },
            ],
            displayProp: 'display',
            valueProp: 'value',
          },
        },
        value: unit,
      }),
      expirationDate: this.tfb.date({
        visible: true,
        params: { label: 'Expiration Date' },
        value: expirationDate,
      }),
    });
  }

  onAdd(): void {
    // this.dialogRef.close(this.form.formGroup.value);
    this.addClicked.emit(this.form.formGroup.value);
  }

  onUpdate(): void {
    // this.dialogRef.close(this.form.formGroup.value);
    this.updateClicked.emit({
      ingr: this.form.formGroup.value,
      ingrIdx: this.ingrIdx,
    });
  }
}
