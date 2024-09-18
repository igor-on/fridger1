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

  protected readonly FormArray!: FormArray;

  constructor(
    private tfb: TemplateFormBuilder,
    private recipeService: RecipeService,
    private messageService: MessageService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.formValue = this.getFormValue();
  }

  ngOnInit(): void {
    this.initTemplateForm();
  }

  ngAfterViewInit(): void {
    this.formValue = this.getFormValue();
  }

  get recipeIngredients() {
    return this.ingredientsForm?.formGroup.get(
      'recipeIngredients'
    ) as FormArray;
  }

  onDone() {
    this.formValue = this.getFormValue();

    console.log(this.formValue);

    this.recipeService.createRecipe(this.formValue).subscribe(response => {
      console.log(response);
      this.messageService.sendMessage('Recipe created successfully');
    });
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
    this.recipeFields = this.tfb.fields({
      name: this.tfb.text({
        params: { label: 'Recipe Name' },
        validators: [Validators.required],
      }),
      description: this.tfb.text({
        params: { label: 'Description' },
        validators: [Validators.required],
      }),
      link: this.tfb.text({
        params: { label: 'Link' },
      }),
      imageUrl: this.tfb.text({
        params: { label: 'Image URL' },
      }),
      favorite: this.tfb.checkbox({
        params: { label: 'Favorite' },
        value: false,
      }),
    });

    this.ingredientsFields = this.tfb.fields({
      recipeIngredients: this.tfb.array(
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
      ),
    });

    this.instructionsFields = this.tfb.fields({
      instructions: this.tfb.textarea({
        params: { label: 'Instructions' },
        validators: [Validators.required],
      }),
    });
  }
}
