import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { Icon } from 'src/app/shared/icons';

@Component({
  selector: 'app-sidebar-mobile',
  standalone: true,
  imports: [MatIconModule, RouterModule],
  templateUrl: './sidebar-mobile.component.html',
  styleUrl: './sidebar-mobile.component.scss',
})
export class SidebarMobileComponent {
  @Output() closeMenu: EventEmitter<void> = new EventEmitter<void>();

  readonly Icon = Icon;

  constructor(private router: Router) {}

  onNavigation(route: string) {
    this.router.navigate([route]);
    this.closeMenu.emit();
  }
}
