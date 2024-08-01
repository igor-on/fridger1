import { DialogModule } from '@angular/cdk/dialog';
import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { GroceriesList } from 'src/app/shared/models/groceries-list';
import { ListGroceriesList } from 'src/app/shared/models/list-groceries-list.model';

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
  ],
  templateUrl: './groceries-details.component.html',
  styleUrl: './groceries-details.component.scss',
})
export class GroceriesDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<GroceriesDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ListGroceriesList
  ) {}
}
