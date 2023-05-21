import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Recipe } from 'src/app/common/recipe';
import { MessageService } from 'src/app/services/message.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {


  recipeForm!: FormGroup;

  editMode: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private recipeService: RecipeService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.editMode = params.has('id')
      this.initForm();
    })
  }

  initForm() {
    let id = new FormControl();
    let name = new FormControl('');
    let description = new FormControl('');
    let instructions = new FormControl('');
    let link = new FormControl('');
    let imageUrl = new FormControl('');
    let recipeIngredients = new FormArray([
      new FormGroup({
        id: new FormControl(0),
        ingredient: new FormGroup({
          name: new FormControl('')
        }),
        quantity: new FormControl(''),
        unit: new FormControl(''),
      })
    ])



    if (this.editMode) {
      console.log('edit mode')
      const recipeId = this.route.snapshot.paramMap.get('id');

      this.recipeService.getRecipeDetails(recipeId!).subscribe(
        data => {

          id.setValue(data.id);
          name.setValue(data.name);
          description.setValue(data.description);
          instructions.setValue(data.instructions);
          link.setValue(data.link);
          imageUrl.setValue(data.imageUrl);

          this.onDeleteRecipeIngredient();

          data.recipeIngredients.forEach((recipeIngr) => {
            const ingr = new FormGroup({
              id: new FormControl(recipeIngr.id),
              ingredient: new FormGroup({
                name: new FormControl(recipeIngr.ingredient.name)
              }),
              quantity: new FormControl(recipeIngr.quantity.toString()),
              unit: new FormControl(recipeIngr.unit)
            });
            recipeIngredients.push(ingr);
          });
        }
      )

    }

    this.recipeForm = new FormGroup({
      id: id,
      name: name,
      description: description,
      instructions: instructions,
      link: link,
      imageUrl: imageUrl,
      recipeIngredients: recipeIngredients
    })
  }

  onCreate() {
    console.log('Form submitted!')
    console.log(`recipeForm:`)
    console.log(this.recipeForm.value)


    if (this.editMode) {
      this.recipeService.updateRecipe(this.recipeForm.value).subscribe(response => {
        console.log("Recipe updated, message: " + response.message)
        this._handleResponse(response)
      })
    } else {
      this.recipeService.createRecipe(this.recipeForm.value).subscribe(response => {
        console.log("Recipe created, message: " + response.message)
        this._handleResponse(response)
      })
    }
    
    // this.messageService.sendMessage()
  }
  
  private _handleResponse(response: any) {
    this.router.navigate(['/']);
    this.messageService.sendMessage(response.message)
  }

  get ingrControls() {
    return (<FormArray>this.recipeForm.get('recipeIngredients')).controls;
  }

  onAddRecipeIngredient() {
    (<FormArray>this.recipeForm.get('recipeIngredients')).push(
      new FormGroup({
        ingredient: new FormGroup({
          name: new FormControl(null)
        }),
        quantity: new FormControl(null),
        unit: new FormControl(null)
      })
    );
  }

  onDeleteRecipeIngredient() {
    // if ((<FormArray>this.recipeForm.get('recipeIngredients')).length - 1 == 0) {
    //   return
    // }

    (<FormArray>this.recipeForm.get('recipeIngredients')).removeAt((<FormArray>this.recipeForm.get('recipeIngredients')).length - 1);
  }
}
