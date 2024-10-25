import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { getFormControl } from 'src/app/utils/form-helper';
import { FridgeIngredient } from 'src/app/shared/models/fridge';
import { MatIconModule } from '@angular/material/icon';
import { AsTypePipe } from 'src/app/core/pipes/as-type.pipe';
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
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { Icon } from 'src/app/shared/icons';
import { MobileAddBtnComponent } from 'src/app/shared/components/mobile-add-btn/mobile-add-btn.component';
import { AddSingleIngredientDialogComponent } from './add-single-ingredient-dialog/add-single-ingredient-dialog.component';
import {
  downSlideInOutAnimationComp,
  fadeInOut,
  fadeInOut2,
} from 'src/app/animations';
import { CommonModule } from '@angular/common';

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
    ButtonComponent,
    MobileAddBtnComponent,
    AddSingleIngredientDialogComponent,
    CommonModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-ingredient-dialog.component.html',
  styleUrl: './add-ingredient-dialog.component.scss',
  animations: [fadeInOut, downSlideInOutAnimationComp, fadeInOut2],
})
export class AddIngredientDialogComponent implements OnInit {
  protected readonly Icon = Icon;

  ingredients: FridgeIngredient[] = [];
  selectedIngredient: FridgeIngredient | undefined = undefined;
  ingrIdx = this.ingredients.length;

  addIngredientDialogVisible: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<
      AddIngredientDialogComponent,
      FridgeIngredient
    >
  ) {}

  ngOnInit(): void {}

  onX(ingrIdx: number): void {
    this.ingredients.splice(ingrIdx, 1);
  }

  onSave(): void {
    console.log(this.ingredients);
  }

  onAdd(data: FridgeIngredient) {
    if (data) {
      this.ingredients.push(data);
    }
    this.addIngredientDialogVisible = false;
  }

  onUpdate(data: { ingr: FridgeIngredient; ingrIdx: number }) {
    if (data) {
      this.ingredients[data.ingrIdx] = data.ingr;
    }
    this.addIngredientDialogVisible = false;
  }
}
