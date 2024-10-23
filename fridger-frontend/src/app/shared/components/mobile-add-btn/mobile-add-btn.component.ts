import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Icon } from '../../icons';

@Component({
  selector: 'app-mobile-add-btn',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './mobile-add-btn.component.html',
  styleUrl: './mobile-add-btn.component.scss',
})
export class MobileAddBtnComponent {
  @Output() btnClicked = new EventEmitter<Event>();

  protected readonly Icon = Icon;
}
