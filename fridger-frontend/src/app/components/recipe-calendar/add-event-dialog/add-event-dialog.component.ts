import { Component, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PlannedRecipe } from 'src/app/shared/models/planned-recipe';
import { Recipe } from 'src/app/shared/models/recipe';
import { CalendarService } from 'src/app/services/calendar.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { T } from '@fullcalendar/core/internal-common';
import {
  TemplateFormBuilder,
  TemplateFormField,
} from 'src/app/shared/components/dynamic-form/template-form-field';
import { DynamicFormComponent } from 'src/app/shared/components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.scss'],
})
export class AddEventDialogComponent {
  // eventForm: FormGroup;
  @ViewChild('form') form?: DynamicFormComponent<any>;

  recipes!: Recipe[];
  plannedRecipe!: PlannedRecipe;
  editMode: boolean;

  fields!: TemplateFormField[];

  constructor(
    public dialogRef: MatDialogRef<AddEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { recipes: Recipe[]; plannedRecipe: PlannedRecipe },
    private tfb: TemplateFormBuilder
  ) {
    console.log('dialog data: ', this.data);
    this.recipes = this.data.recipes;
    this.editMode = this.data.plannedRecipe !== null;
    console.log('Dialog edit mode: ', this.editMode);
    this.initTemplateForm();
  }

  initTemplateForm() {
    let date = null;
    let recipe = null;
    let time = null;
    let done = false;

    if (this.editMode) {
      date = new Date(this.data.plannedRecipe?.plannedDate) ?? null;
      time = date?.toLocaleTimeString() ?? null;
      recipe = this.data.plannedRecipe?.recipe ?? null;
      done = this.data.plannedRecipe?.done ?? false;
    }

    console.log(date);
    console.log(time);
    console.log(recipe);

    this.fields = this.tfb.fields({
      date: this.tfb.date({
        params: {
          label: 'Date',
        },
        value: date,
        validators: [Validators.required],
      }),
      time: this.tfb.text({
        params: {
          label: 'Time',
          type: 'time',
        },
        value: time,
        validators: [Validators.required],
      }),
      recipe: this.tfb.select({
        params: {
          label: 'Recipe',
          options: {
            data: this.recipes.map(v => {
              return {
                value: v,
                label: v.name,
              };
            }),
            displayProp: 'label',
            valueProp: 'value',
          },
        },
        value: this.recipes.find(v => v.id === recipe?.id),
        validators: [Validators.required],
      }),
      done: this.tfb.checkbox({
        params: {
          label: 'Done',
        },
        value: done,
      }),
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
