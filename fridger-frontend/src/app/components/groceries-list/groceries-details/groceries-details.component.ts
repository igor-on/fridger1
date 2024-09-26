import { DialogModule } from '@angular/cdk/dialog';
import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FridgeService } from 'src/app/services/fridge.service';
import { MessageService } from 'src/app/services/message.service';
import { GroceriesList } from 'src/app/shared/models/groceries-list';
import { ListGroceriesList } from 'src/app/shared/models/list-groceries-list.model';
import { AsTypePipe } from 'src/app/shared/pipes/as-type.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-groceries-details',
  standalone: true,
  imports: [
    DialogModule,
    MatTableModule,
    DatePipe,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormField,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    AsTypePipe,
    MatIconModule,
    MatTooltipModule,
    MatBadgeModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './groceries-details.component.html',
  styleUrl: './groceries-details.component.scss',
})
export class GroceriesDetailsComponent implements OnInit {
  dialogReadingInfo =
    'This list was generated with fridge ingredients checking option enabled. The ingredients you are missing are in the first table. The ingredients that are already in your fridge are on the second table.';
  form!: FormArray;
  editMode = false;
  tableColumns: string[] = ['name', 'quantity', 'unit'];
  tableFridgeColumns: string[] = [
    'name',
    'quantity',
    'unit',
    'expiration-date',
  ];
  protected readonly FormControl!: FormControl;

  constructor(
    public dialogRef: MatDialogRef<GroceriesDetailsComponent>,
    public dialog: MatDialog,
    public fb: FormBuilder,
    public fridgeService: FridgeService,
    public messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: ListGroceriesList
  ) {}

  ngOnInit(): void {
    this.initForm();
    console.log(this.form.value);
  }

  onAddToFridge() {
    if (!this.editMode) {
      const dialogRef = this.dialog.open(AddExpirationDateDialog);

      dialogRef.afterClosed().subscribe(add => {
        console.log(add);
        if (add == undefined) {
          return;
        } else if (add) {
          this.editMode = true;
          this.tableColumns.push('expiration-date');
        } else {
          this.send();
        }
      });
    } else {
      this.tableColumns.pop();
      this.send();
      console.log(this.form.value);
    }
  }

  send() {
    this.fridgeService.postIngredients(this.form.value).subscribe(() => {
      console.log('Ingredients added to fridge');
      this.messageService.sendMessage('Ingredients added to fridge');
    });
  }

  initForm() {
    this.form = this.fb.array([]);

    this.data.ingredients.forEach(ingredient => {
      this.form.push(
        this.fb.group({
          ingredient: this.fb.group({
            name: ingredient.ingredientName,
          }),
          quantity: ingredient.quantity,
          unit: ingredient.unit,
          expirationDate: this.fb.control(null),
        })
      );
    });
  }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  template: `<h2 mat-dialog-title>Add expiration date</h2>
    <mat-dialog-content>
      Would you like to add an expiration date to your ingredients?
    </mat-dialog-content>
    <mat-dialog-actions>
      <button type="button" class="btn-primary mr-4" [mat-dialog-close]="false">
        No (Add to fridge)
      </button>
      <button
        type="button"
        class="btn-primary"
        [mat-dialog-close]="true"
        cdkFocusInitial>
        Ok
      </button>
    </mat-dialog-actions>`,
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
})
export class AddExpirationDateDialog {
  constructor(public dialogRef: MatDialogRef<AddExpirationDateDialog>) {}
}
function providerNativeDateAdapter(): import('@angular/core').Provider {
  throw new Error('Function not implemented.');
}
