import { DatePipe, JsonPipe } from '@angular/common';
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
import { MatIconModule } from '@angular/material/icon';
import { UpdateIngredientDialogComponent } from './update-ingredient-dialog/update-ingredient-dialog.component';
import {
  CloseScrollStrategy,
  NoopScrollStrategy,
  ScrollStrategyOptions,
} from '@angular/cdk/overlay';

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
    DatePipe,
    MatIconModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './fridge.component.html',
  styleUrl: './fridge.component.scss',
})
export class FridgeComponent implements OnInit {
  fridge!: Fridge;
  ingredientsType: string[] | undefined;
  editMode: boolean = false;
  columns = [
    'insert-date',
    'name',
    'quantity',
    'unit',
    'expiration-date',
    'open',
    'after-opening-expiration-date',
    'actions',
  ];

  ingredientsForm = new FormArray<any>([]);
  formControlMap: { [id: number]: FormGroup } = {};

  constructor(
    private fridgeService: FridgeService,
    private modelService: ModelService,
    private messageService: MessageService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fridgeService.getFridge().subscribe(data => {
      this.fridge = data.data;
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
        // this.initForm();
        this.messageService.sendMessage('Ingredients saved successfully!');
      });
  }

  public onDelete(id: number) {
    this.fridgeService.deleteIngredient(id).subscribe(() => {
      this.fridge!.fridgeIngredients = this.fridge.fridgeIngredients.filter(
        i => i.id !== id
      );
      console.log('deleted: ', id);
      this.messageService.sendMessage('Ingredient deleted successfully!');
    });
  }

  public onEdit(ingr: FridgeIngredient) {
    const dialogRef = this.dialog.open(UpdateIngredientDialogComponent, {
      data: ingr,
      minWidth: '40rem',
      position: { top: '5%' },
    });

    dialogRef
      .afterClosed()
      .pipe(
        concatMap((data: FridgeIngredient) => {
          if (data) {
            console.log(data);

            // Format the dates to local time before sending
            FridgeIngredient.convertDatesToLocal(data);
            return this.fridgeService.putIngredient(data);
          }
          return [];
        })
      )
      .subscribe(data => {
        const ingr = this.fridge.fridgeIngredients.filter(
          fi => fi.id === data.data.id
        );
        if (ingr.length != 1) {
          throw new Error('Ingredient not found');
        }
        const idx = this.fridge.fridgeIngredients.indexOf(ingr[0]);
        this.fridge.fridgeIngredients[idx] = data.data;

        this.messageService.sendMessage('Ingredient updated successfully!');
      });
  }

  get ingrControls() {
    return this.ingredientsForm.controls;
  }

  getFormControl(id: number, name: string) {
    return this.formControlMap[id].get(name) as FormControl<any>;
  }
}
