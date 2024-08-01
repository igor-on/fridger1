import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../../shared.module';
import { ListModel } from '../list.model';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [MatIconModule, CommonModule, SharedModule],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss',
})
export class ListItemComponent<T extends ListModel> {
  @Input({ required: true }) item!: T;
  @Output() onItemClickedEvent = new EventEmitter<T>(); // TODO: think about moving it to service
}
