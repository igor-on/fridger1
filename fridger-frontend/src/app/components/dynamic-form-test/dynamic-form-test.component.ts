import { Component, OnInit } from '@angular/core';
import { TemplateFormButton } from 'src/app/shared/components/dynamic-form/dynamic-form-buttons/dynamic-form-buttons.component';
import { DynamicFormComponent } from 'src/app/shared/components/dynamic-form/dynamic-form.component';
import {
  TemplateFormBuilder,
  TemplateFormField,
} from 'src/app/shared/components/dynamic-form/template-form-field';

@Component({
  selector: 'app-dynamic-form-test',
  standalone: true,
  imports: [DynamicFormComponent],
  templateUrl: './dynamic-form-test.component.html',
  styleUrl: './dynamic-form-test.component.scss',
})
export class DynamicFormTestComponent implements OnInit {
  fields!: TemplateFormField[];
  fields2!: TemplateFormField[];
  btns!: TemplateFormButton[];

  constructor(private tfb: TemplateFormBuilder) {}

  ngOnInit(): void {
    this.fields2 = this.tfb.fields({
      hello: this.tfb.array([
        this.tfb.group({
          name: this.tfb.text({
            params: {
              label: 'ARRAY hello',
              type: 'text',
            },
            visible: true,
            onChange: (value, form) => {
              console.log('My first text array changed!: ', value);
            },
          }),
          startDate: this.tfb.date({
            params: {
              label: 'Start Date',
              hint: true,
            },
            visible: true,
            onChange: (value, form) => {
              console.log('My first date change: ', new Date(value));
            },
          }),
          testArray: this.tfb.array([
            this.tfb.group({
              name: this.tfb.text({
                params: {
                  label: 'ARRAY hello',
                  type: 'text',
                },
                visible: true,
                onChange: (value, form) => {
                  console.log('My first text array changed!: ', value);
                },
              }),
              startDate: this.tfb.date({
                params: {
                  label: 'Start Date',
                  hint: true,
                },
                visible: true,
                onChange: (value, form) => {
                  console.log('My first date change: ', new Date(value));
                },
              }),
            }),
          ]),
        }),
      ]),
    });

    this.fields = this.tfb.fields({
      name: this.tfb.text({
        params: {
          label: 'hello',
          type: 'text',
        },
        visible: true,
        onChange: (value, form) => {
          console.log('My first text changed!: ', value);
        },
      }),
      testing: this.tfb.select({
        params: {
          label: 'Another',
          multiple: true,
          required: false,
          reset: false,
          options: {
            data: [
              { id: 1, brand: 'Volvo', model: 'XC90' },
              { id: 2, brand: 'Saab', model: '9-3' },
              { id: 3, brand: 'Mercedes', model: 'C-Class' },
              { id: 4, brand: 'Audi', model: 'A4' },
            ],
            displayProp: 'brand',
            valueProp: 'id',
          },
        },
        visible: true,
        onChange: (value, form) => {
          console.log('My first select changed Another!: ', value);
        },
      }),
      startDate: this.tfb.date({
        params: {
          label: 'Start Date',
          hint: true,
        },
        visible: true,
        onChange: (value, form) => {
          console.log('My first date change: ', new Date(value));
        },
      }),
      ingr: this.tfb.group({
        name: this.tfb.text({
          params: {
            label: 'Group hello',
            type: 'text',
          },
          visible: true,
          onChange: (value, form) => {
            console.log('My first text group changed!: ', value);
          },
        }),
      }),
    });

    this.btns = [
      {
        text: 'HELLO',
        type: 'button',
        icon: 'home',
        color: 'primary',
        onClick: event => {
          console.log('Button clicked: ', event);
        },
      },
      {
        text: 'HELLO',
        type: 'button',
        icon: 'home',
        color: 'warn',
        onClick: (event, form) => {
          console.log('Button clicked: ', event);
          console.log('form value: ', form.value);
        },
      },
    ];
  }
}
