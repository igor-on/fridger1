import { Component, OnInit } from '@angular/core';
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
import { FridgeIngredient } from 'src/app/common/fridge';
import { MatIconModule } from '@angular/material/icon';
import { AsTypePipe } from 'src/app/utils/pipes/as-type.pipe';

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
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-ingredient-dialog.component.html',
  styleUrl: './add-ingredient-dialog.component.scss',
})
export class AddIngredientDialogComponent implements OnInit {
  ingredientsFormArray!: FormArray;
  protected readonly FormGroup!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<
      AddIngredientDialogComponent,
      FridgeIngredient
    >,
    public fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.ingredientsFormArray = this.fb.array([
      this.fb.group({
        ingredient: this.fb.group({
          name: ['', Validators.required],
        }),
        quantity: ['', Validators.required],
        unit: ['', Validators.required],
        expirationDate: [''],
      }),
    ]);
  }

  // get ingredientsForm() {
  //   return <FormArray<FormGroup<any>>>this.ingredientsFormArray;
  // }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    console.log(this.ingredientsFormArray.value);
    this.dialogRef.close(this.ingredientsFormArray.value);
  }

  hasError(idx: number, err: string, controlName: string): boolean {
    return getFormControl(
      this.ingredientsFormArray.at(idx) as FormGroup,
      controlName
    ).hasError(err);
  }

  onAdd() {
    this.ingredientsFormArray.push(
      this.fb.group({
        ingredient: this.fb.group({
          name: ['', Validators.required],
        }),
        quantity: ['', Validators.required],
        unit: ['', Validators.required],
        expirationDate: [''],
      })
    );
  }

  onDelete() {
    if (this.ingredientsFormArray.length === 1) {
      return;
    }

    this.ingredientsFormArray.removeAt(this.ingredientsFormArray.length - 1);
  }
}
