import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [MatIconModule, CommonModule, SharedModule],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss',
})
export class ListItemComponent {
  @Input({ required: true }) label!: string;
}
