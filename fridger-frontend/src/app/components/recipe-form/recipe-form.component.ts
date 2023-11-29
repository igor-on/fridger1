import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Recipe } from 'src/app/common/recipe';
import { noWhitespaceValidator } from 'src/app/common/validators';
import { MessageService } from 'src/app/services/message.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
})
export class RecipeFormComponent implements OnInit {
  recipeForm!: FormGroup;

  editMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.editMode = params.has('id');
      this.initForm();
    });
  }

  initForm() {
    let id = new FormControl();
    let name = new FormControl('', [
      Validators.required,
      noWhitespaceValidator,
    ]);
    let description = new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
      noWhitespaceValidator,
    ]);
    let instructions = new FormControl('', [
      Validators.required,
      Validators.maxLength(1000),
      noWhitespaceValidator,
    ]);
    let link = new FormControl('', [
      Validators.maxLength(255),
      noWhitespaceValidator,
    ]);
    let imageUrl = new FormControl('', [
      Validators.maxLength(255),
      noWhitespaceValidator,
    ]);
    let recipeIngredients = new FormArray([
      new FormGroup({
        id: new FormControl(0),
        ingredient: new FormGroup({
          name: new FormControl('', [
            Validators.required,
            Validators.maxLength(255),
            noWhitespaceValidator,
          ]),
        }),
        quantity: new FormControl('', Validators.required),
        unit: new FormControl('', [
          Validators.required,
          Validators.maxLength(255),
          noWhitespaceValidator,
        ]),
      }),
    ]);

    if (this.editMode) {
      console.log('edit mode');
      const recipeId = this.route.snapshot.paramMap.get('id');

      this.recipeService.getRecipeDetails(recipeId!).subscribe(data => {
        id.setValue(data.id);
        name.setValue(data.name);
        description.setValue(data.description);
        instructions.setValue(data.instructions);
        link.setValue(data.link);
        imageUrl.setValue(data.imageUrl);

        // this.onDeleteRecipeIngredient();

        recipeIngredients.clear(); // when dont want to have pre prepared ingredients

        data.recipeIngredients.forEach(recipeIngr => {
          const ingr = new FormGroup({
            id: new FormControl(recipeIngr.id),
            ingredient: new FormGroup({
              name: new FormControl(recipeIngr.ingredient.name, [
                Validators.required,
                Validators.maxLength(255),
                noWhitespaceValidator,
              ]),
            }),
            quantity: new FormControl(
              recipeIngr.quantity.toString(),
              Validators.required
            ),
            unit: new FormControl(recipeIngr.unit, [
              Validators.required,
              Validators.maxLength(255),
              noWhitespaceValidator,
            ]),
          });
          recipeIngredients.push(ingr);
        });
      });
    }

    this.recipeForm = new FormGroup({
      id: id,
      name: name,
      description: description,
      instructions: instructions,
      link: link,
      imageUrl: imageUrl,
      recipeIngredients: recipeIngredients,
    });
  }

  onCreate() {
    console.log('Form submitted!');
    console.log(`recipeForm:`);
    console.log(this.recipeForm.value);

    if (this.editMode) {
      this.recipeService
        .updateRecipe(this.recipeForm.value)
        .subscribe(response => {
          console.log('Recipe updated, message: ' + response.message);
          this._handleResponse(response);
        });
    } else {
      this.recipeService
        .createRecipe(this.recipeForm.value)
        .subscribe(response => {
          console.log('Recipe created, message: ' + response.message);
          this._handleResponse(response);
        });
    }

    // this.messageService.sendMessage()
  }

  private _handleResponse(response: any) {
    this.router.navigate(['/']);
    this.messageService.sendMessage(response.message);
  }

  get ingrControls() {
    return (<FormArray>this.recipeForm.get('recipeIngredients')).controls;
  }

  onAddRecipeIngredient() {
    (<FormArray>this.recipeForm.get('recipeIngredients')).push(
      new FormGroup({
        ingredient: new FormGroup({
          name: new FormControl(null, [
            Validators.required,
            Validators.maxLength(255),
            noWhitespaceValidator,
          ]),
        }),
        quantity: new FormControl(null, Validators.required),
        unit: new FormControl(null, [
          Validators.required,
          Validators.maxLength(255),
          noWhitespaceValidator,
        ]),
      })
    );
  }

  onDeleteRecipeIngredient() {
    if ((<FormArray>this.recipeForm.get('recipeIngredients')).length === 1) {
      return;
    }

    (<FormArray>this.recipeForm.get('recipeIngredients')).removeAt(-1);
  }

  inputInvalid(controlName: string) {
    return (
      this.recipeForm.get(controlName)?.touched &&
      !this.recipeForm.get(controlName)?.valid
    );
  }

  inputErrors(controlName: string) {
    return this.recipeForm.get(controlName)?.errors;
  }
}
