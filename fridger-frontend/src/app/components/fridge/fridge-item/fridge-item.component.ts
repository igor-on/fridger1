import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Icon } from 'src/app/shared/icons';

@Component({
  selector: 'app-fridge-item',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './fridge-item.component.html',
  styleUrl: './fridge-item.component.scss',
})
export class FridgeItemComponent {
  protected readonly Icon = Icon;
}
