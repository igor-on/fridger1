import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Icon } from 'src/app/shared/icons';

@Component({
  selector: 'app-sidebar-mobile',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './sidebar-mobile.component.html',
  styleUrl: './sidebar-mobile.component.scss',
})
export class SidebarMobileComponent {
  @Output() closeMenu: EventEmitter<void> = new EventEmitter<void>();

  readonly Icon = Icon;
}
