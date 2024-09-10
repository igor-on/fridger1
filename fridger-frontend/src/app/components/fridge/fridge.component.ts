import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { Fridge, FridgeIngredient } from 'src/app/shared/models/fridge';
import { Ingredient } from 'src/app/shared/models/recipe';
import { noWhitespaceValidator } from 'src/app/shared/validators';
import { FridgeService } from 'src/app/services/fridge.service';
import { MessageService } from 'src/app/services/message.service';
import { ModelService } from 'src/app/services/model.service';
import { AddIngredientDialogComponent } from './add-ingredient-dialog/add-ingredient-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { concatMap } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-fridge',
  standalone: true,
  imports: [
    JsonPipe,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './fridge.component.html',
  styleUrl: './fridge.component.scss',
})
export class FridgeComponent implements OnInit {
  fridge!: Fridge;
  ingredientsType: string[] | undefined;
  editMode: boolean = false;

  ingredientsForm = new FormArray<any>([]);
  formControlMap: { [id: number]: FormGroup } = {};

  constructor(
    private fridgeService: FridgeService,
    private modelService: ModelService,
    private messageService: MessageService,
    private dialog: MatDialog
  ) {}

  initForm(fridgeIngredients = this.fridge.fridgeIngredients): void {
    this.ingredientsForm.clear();

    for (let ingr of fridgeIngredients ?? []) {
      this.formControlMap[ingr.id] = new FormGroup({
        id: new FormControl(ingr.id),
        ingredient: new FormGroup({
          name: new FormControl(ingr.ingredient.name, [
            Validators.required,
            Validators.maxLength(255),
            noWhitespaceValidator,
          ]),
          // TODO: handle validators in template
          type: new FormControl(ingr.ingredient.type),
        }),
        quantity: new FormControl(ingr.quantity, Validators.required),
        unit: new FormControl(ingr.unit, [
          Validators.required,
          Validators.maxLength(255),
          noWhitespaceValidator,
        ]),
        expirationDate: new FormControl(ingr.expirationDate),
        insertDate: new FormControl(ingr.insertDate),
      });

      this.ingredientsForm.push(this.formControlMap[ingr.id]);
    }

    console.log(this.formControlMap);
  }

  ngOnInit(): void {
    this.fridgeService.getFridge().subscribe(data => {
      this.fridge = data.data;
      this.initForm();
    });
    this.modelService.getIngredientTypes().subscribe(data => {
      this.ingredientsType = data;
    });
  }

  public getIngredientsByType(type: string) {
    if (this.fridge) {
      return this.fridge.fridgeIngredients.filter(
        ingredient => ingredient.ingredient.type === type
      );
    }
    return [];
  }

  public onAdd() {
    const dialogRef = this.dialog.open(AddIngredientDialogComponent);

    dialogRef
      .afterClosed()
      .pipe(
        concatMap((data: FridgeIngredient[]) => {
          if (data) {
            // Format the dates to local time before sending
            data.forEach(ingredient => {
              FridgeIngredient.convertDatesToLocal(ingredient);
            });
            return this.fridgeService.postIngredients(data);
          }
          return [];
        })
      )
      .subscribe(data => {
        this.fridge.fridgeIngredients = data.data.fridgeIngredients;
        this.initForm();
        this.messageService.sendMessage('Ingredients saved successfully!');
      });
  }

  public onSave() {
    console.log('saved');
    console.log(this.ingredientsForm.value);
    this.ingredientsForm.value.forEach((ingredient: any) => {
      FridgeIngredient.convertDatesToLocal(ingredient);
    });
    this.fridgeService
      .putIngredients(this.ingredientsForm.value)
      .subscribe(data => {
        this.fridge.fridgeIngredients = data.data.fridgeIngredients;

        this.messageService.sendMessage('Ingredients saved successfully!');
        this.editMode = false;
      });
  }

  public onDelete(id: number) {
    this.fridgeService.deleteIngredient(id).subscribe(() => {
      this.fridge!.fridgeIngredients = this.fridge.fridgeIngredients.filter(
        i => i.id !== id
      );
      this.initForm();
      console.log('deleted: ', id);
      this.messageService.sendMessage('Ingredient deleted successfully!');
    });
  }

  get ingrControls() {
    return this.ingredientsForm.controls;
  }

  getFormControl(id: number, name: string) {
    return this.formControlMap[id].get(name) as FormControl<any>;
  }
}
