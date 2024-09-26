import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface TemplateFormButton {
  text?: string;
  icon?: string;
  color?: 'primary' | 'accent' | 'warn';
  type: 'button' | 'submit';
  onClick: (event: any, form: FormGroup) => void;
}

@Component({
  selector: 'app-dynamic-form-buttons',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './dynamic-form-buttons.component.html',
  styleUrl: './dynamic-form-buttons.component.scss',
})
export class DynamicFormButtonsComponent {
  @Input({ required: true }) buttons!: TemplateFormButton[];
  @Input({ required: true }) formGroup!: FormGroup;
}
