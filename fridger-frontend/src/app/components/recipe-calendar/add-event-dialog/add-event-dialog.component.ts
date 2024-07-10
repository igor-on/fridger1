import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PlannedRecipe } from 'src/app/common/planned-recipe';
import { Recipe } from 'src/app/common/recipe';
import { CalendarService } from 'src/app/services/calendar.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.scss'],
})
export class AddEventDialogComponent {
  eventForm: FormGroup;

  recipes: Recipe[];
  plannedRecipe: PlannedRecipe;
  editMode: boolean;

  constructor(
    public dialogRef: MatDialogRef<AddEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { recipes: Recipe[]; plannedRecipe: PlannedRecipe },
    private recipeService: RecipeService
  ) {
    console.log('dialog data: ', this.data);
    this.recipes = this.data.recipes;
    this.plannedRecipe = this.data.plannedRecipe;
    this.editMode = this.plannedRecipe !== null;

    console.log('Dialog edit mode: ', this.editMode);

    let date = new FormControl('', Validators.required);
    let recipe = new FormControl<Recipe | undefined>(
      undefined,
      Validators.required
    );
    let done = new FormControl(false);

    if (this.editMode) {
      date.setValue(this.plannedRecipe.plannedDate);
      recipe.setValue(
        this.recipes.find(v => v.id === this.plannedRecipe.recipe.id)
      );
      done.setValue(this.plannedRecipe.done);
    }

    this.eventForm = new FormGroup({
      date: date,
      recipe: recipe,
      done: done,
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
