import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Icon } from 'src/app/shared/icons';
import { FridgeIngredient } from 'src/app/shared/models/fridge';

@Component({
  selector: 'app-fridge-item',
  standalone: true,
  imports: [MatIconModule, DatePipe],
  templateUrl: './fridge-item.component.html',
  styleUrl: './fridge-item.component.scss',
})
export class FridgeItemComponent {
  protected readonly Icon = Icon;

  @Input({ required: true }) ingredient!: FridgeIngredient;
}
