import { Component, OnInit } from '@angular/core';
import {
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

@Component({
  selector: 'app-add-ingredient-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-ingredient-dialog.component.html',
  styleUrl: './add-ingredient-dialog.component.scss',
})
export class AddIngredientDialogComponent implements OnInit {
  ingredientForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddIngredientDialogComponent>) {}

  ngOnInit(): void {
    this.ingredientForm = new FormGroup({
      ingredient: new FormGroup({
        name: new FormControl('', Validators.required),
      }),
      quantity: new FormControl('', Validators.required),
      unit: new FormControl('', Validators.required),
      expirationDate: new FormControl(''),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.ingredientForm.value);
  }

  hasError(err: string, controlName: string): boolean {
    return getFormControl(this.ingredientForm, controlName).hasError(err);
  }
}
