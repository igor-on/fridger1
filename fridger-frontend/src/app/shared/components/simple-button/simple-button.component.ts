import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-simple-button',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './simple-button.component.html',
  styleUrl: './simple-button.component.scss',
})
export class SimpleButtonComponent {
  @Output() btnClicked = new EventEmitter<Event>();
  @Input() disabled = false;
  @Input() twTextColor = 'text-light-red';
  @Input() icon?: string;
}
