import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FridgeIngredient } from 'src/app/shared/models/fridge';
import { MatIconModule } from '@angular/material/icon';
import { AsTypePipe } from 'src/app/core/pipes/as-type.pipe';
import { DynamicFormComponent } from 'src/app/shared/components/dynamic-form/dynamic-form.component';
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
      FridgeIngredient[]
    >
  ) {}

  ngOnInit(): void {}

  onX(ingrIdx: number): void {
    this.ingredients.splice(ingrIdx, 1);
  }

  onSave(): void {
    console.log(this.ingredients);
    this.dialogRef.close(this.ingredients);
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
