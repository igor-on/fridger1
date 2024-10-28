import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ExpirationDateHighlightDirective } from 'src/app/core/directives/expiration-date-highlight.directive';
import { Icon } from 'src/app/shared/icons';
import { FridgeIngredient } from 'src/app/shared/models/fridge';
import { fadeInOut, rightSlideInOutAnimationComp } from 'src/app/animations';

@Component({
  selector: 'app-fridge-item',
  standalone: true,
  imports: [
    MatIconModule,
    DatePipe,
    ExpirationDateHighlightDirective,
    MatMenuModule,
  ],
  templateUrl: './fridge-item.component.html',
  styleUrl: './fridge-item.component.scss',
  animations: [rightSlideInOutAnimationComp, fadeInOut],
})
export class FridgeItemComponent {
  protected readonly Icon = Icon;

  @Output() onEditClick = new EventEmitter<FridgeIngredient>();
  @Output() onDeleteClick = new EventEmitter<number>();

  @Input({ required: true }) ingredient!: FridgeIngredient;
}
