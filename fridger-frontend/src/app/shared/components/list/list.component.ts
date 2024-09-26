import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ListItemComponent } from './list-item/list-item.component';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ListModel } from './list.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ListItemComponent, CommonModule, SkeletonModule, AppRoutingModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent<T extends ListModel> {
  @Input({ required: true }) source!: T[];
  @Input() isLoading?: boolean;
  @Input({ required: true }) circleInfoTemplate!: TemplateRef<any>;
  @Input() rightCornerDataTemplate!: TemplateRef<any>;
  @Output() onItemClickedEvent = new EventEmitter<T | any>();
}
