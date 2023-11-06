import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Recipe } from 'src/app/common/recipe';

@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  // styleUrls: ['./add-event-dialog.component.scss']
})
export class AddEventDialogComponent {
  eventForm: FormGroup;

  recipes: Recipe[];

  constructor(
    public dialogRef: MatDialogRef<AddEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Recipe[]
  ) {
    console.log('dialog data: ', this.data);
    this.recipes = this.data;

    this.eventForm = new FormGroup({
      date: new FormControl('', Validators.required),
      recipe: new FormControl(undefined, Validators.required),
      done: new FormControl(false),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface DialogData {
  animal: string;
  name: string;
}
