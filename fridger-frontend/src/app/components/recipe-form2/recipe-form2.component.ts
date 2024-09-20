import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { DynamicFormComponent } from 'src/app/shared/components/dynamic-form/dynamic-form.component';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import {
  TemplateFormBuilder,
  TemplateFormField,
} from 'src/app/shared/components/dynamic-form/template-form-field';
import { JsonPipe } from '@angular/common';
import { RecipeService } from 'src/app/services/recipe.service';
import { MessageService } from 'src/app/services/message.service';
import { AsTypePipe } from 'src/app/shared/pipes/as-type.pipe';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-form2',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    DynamicFormComponent,
    JsonPipe,
    AsTypePipe,
  ],
  templateUrl: './recipe-form2.component.html',
  styleUrl: './recipe-form2.component.scss',
})
export class RecipeForm2Component implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('recipeForm') recipeForm!: DynamicFormComponent<any>;
  @ViewChild('ingredientsForm') ingredientsForm!: DynamicFormComponent<any>;
  @ViewChild('instructionsForm') instructionsForm!: DynamicFormComponent<any>;
  recipeFields!: TemplateFormField[];
  ingredientsFields!: TemplateFormField[];
  instructionsFields!: TemplateFormField[];
  formValue: any;

  editMode: boolean = false;

  protected readonly FormArray!: FormArray;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tfb: TemplateFormBuilder,
    private recipeService: RecipeService,
    private messageService: MessageService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.formValue = this.getFormValue();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.route.paramMap.subscribe(params => {
      this.editMode = params.has('id');
      this.initTemplateForm();
    });
    // this.formValue = this.getFormValue();
  }

  get recipeIngredients() {
    return this.ingredientsForm?.formGroup.get(
      'recipeIngredients'
    ) as FormArray;
  }

  onDone() {
    this.formValue = this.getFormValue();

    console.log(this.formValue);

    if (this.editMode) {
      this.recipeService
        .updateRecipe({
          id: this.route.snapshot.paramMap.get('id'),
          ...this.formValue,
        })
        .subscribe(response => {
          console.log(response);
          this.messageService.sendMessage('Recipe updated successfully');
          this.router.navigate(['/recipes']);
        });
    } else {
      this.recipeService.createRecipe(this.formValue).subscribe(response => {
        console.log(response);
        this.messageService.sendMessage('Recipe created successfully');
        this.router.navigate(['/recipes']);
      });
    }
  }

  getFormValue() {
    const recipeForm = this.recipeForm.formGroup.value;
    const ingredientsForm = this.ingredientsForm.formGroup.value;
    const instructionsForm = this.instructionsForm.formGroup.value;

    return {
      ...recipeForm,
      ...ingredientsForm,
      ...instructionsForm,
    };
  }

  initTemplateForm() {
    let name = null;
    let description = null;
    let link = null;
    let imageUrl = null;
    let favorite = false;
    let recipeIngredients = this.tfb.array(
      [
        this.tfb.group({
          ingredient: this.tfb.group({
            name: this.tfb.text({
              params: { label: 'Ingredient Name' },
              validators: [Validators.required],
            }),
          }),
          quantity: this.tfb.text({
            params: { label: 'Quantity', type: 'number' },
            validators: [Validators.required, Validators.min(0)],
          }),
          unit: this.tfb.select({
            visible: true,
            params: {
              label: 'Unit',
              options: {
                data: [
                  { value: 'KG', display: 'kilogram' },
                  {
                    value: 'G',
                    display: 'gram',
                  },
                  { value: 'ML', display: 'mililiter' },
                  { value: 'PCS', display: 'pieces' },
                ],
                displayProp: 'display',
                valueProp: 'value',
              },
            },
          }),
        }),
      ],
      true
    );
    let instructions = null;

    if (this.editMode) {
      this.recipeService
        .getRecipeDetails(this.route.snapshot.params['id'])
        .subscribe(response => {
          console.log('response: ', response);

          name = response.name;
          description = response.description;
          link = response.link;
          imageUrl = response.imageUrl;
          favorite = response.favorite;
          recipeIngredients = this.tfb.array(
            response.recipeIngredients.map(ingredient => {
              return this.tfb.group({
                ingredient: this.tfb.group({
                  name: this.tfb.text({
                    params: { label: 'Ingredient Name' },
                    value: ingredient.ingredient.name,
                    validators: [Validators.required],
                  }),
                }),
                quantity: this.tfb.text({
                  params: { label: 'Quantity', type: 'number' },
                  value: ingredient.quantity,
                  validators: [Validators.required, Validators.min(0)],
                }),
                unit: this.tfb.select({
                  visible: true,
                  params: {
                    label: 'Unit',
                    options: {
                      data: [
                        { value: 'KG', display: 'kilogram' },
                        {
                          value: 'G',
                          display: 'gram',
                        },
                        { value: 'ML', display: 'mililiter' },
                        { value: 'PCS', display: 'pieces' },
                      ],
                      displayProp: 'display',
                      valueProp: 'value',
                    },
                  },
                  value: ingredient.unit,
                }),
              });
            }),
            true
          );
          instructions = response.instructions;

          this.recipeFields = this.tfb.fields({
            name: this.tfb.text({
              params: { label: 'Recipe Name' },
              validators: [Validators.required],
              value: name,
            }),
            description: this.tfb.text({
              params: { label: 'Description' },
              validators: [Validators.required],
              value: description,
            }),
            link: this.tfb.text({
              params: { label: 'Link' },
              value: link,
            }),
            imageUrl: this.tfb.text({
              params: { label: 'Image URL' },
              value: imageUrl,
            }),
            favorite: this.tfb.checkbox({
              params: { label: 'Favorite' },
              value: favorite,
            }),
          });

          this.ingredientsFields = this.tfb.fields({
            recipeIngredients: recipeIngredients,
          });

          this.instructionsFields = this.tfb.fields({
            instructions: this.tfb.textarea({
              params: { label: 'Instructions' },
              validators: [Validators.required],
              value: instructions,
            }),
          });
        });
    } else {
      this.recipeFields = this.tfb.fields({
        name: this.tfb.text({
          params: { label: 'Recipe Name' },
          validators: [Validators.required],
          value: name,
        }),
        description: this.tfb.text({
          params: { label: 'Description' },
          validators: [Validators.required],
          value: description,
        }),
        link: this.tfb.text({
          params: { label: 'Link' },
          value: link,
        }),
        imageUrl: this.tfb.text({
          params: { label: 'Image URL' },
          value: imageUrl,
        }),
        favorite: this.tfb.checkbox({
          params: { label: 'Favorite' },
          value: favorite,
        }),
      });

      this.ingredientsFields = this.tfb.fields({
        recipeIngredients: recipeIngredients,
      });

      this.instructionsFields = this.tfb.fields({
        instructions: this.tfb.textarea({
          params: { label: 'Instructions' },
          validators: [Validators.required],
          value: instructions,
        }),
      });
    }
  }
}
