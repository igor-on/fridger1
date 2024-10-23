import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SafeUrl } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { concatMap, EMPTY, Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Icon } from 'src/app/shared/icons';
import { UserDTO } from 'src/app/shared/models/user.dto';

@Component({
  selector: 'app-sidebar-mobile',
  standalone: true,
  imports: [MatIconModule, RouterModule],
  templateUrl: './sidebar-mobile.component.html',
  styleUrl: './sidebar-mobile.component.scss',
})
export class SidebarMobileComponent implements OnInit, OnDestroy {
  @Output() closeMenu: EventEmitter<void> = new EventEmitter<void>();

  readonly Icon = Icon;

  user?: UserDTO;
  userProfilePicture!: SafeUrl;
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    console.log('Sidebar mobile component initialized');

    this.subscriptions.push(
      this.userService.authUser
        .pipe(
          concatMap(authUser => {
            if (!authUser) {
              return EMPTY;
            }
            return this.userService.getUserProfilePicture(authUser.username);
          })
        )
        .subscribe((imgUrl: SafeUrl) => {
          this.userProfilePicture = imgUrl;
        })
    );

    this.subscriptions.push(
      this.userService.authUser
        .pipe(
          concatMap(authUser => {
            if (!authUser) {
              return EMPTY;
            }
            return this.userService.getUserDetails(authUser.username);
          })
        )
        .subscribe((user: UserDTO) => {
          this.user = user;
        })
    );

    this.subscriptions.push(
      this.userService.profilePictureChanged.subscribe((imgUrl: SafeUrl) => {
        this.userProfilePicture = imgUrl;
      })
    );
  }

  onNavigation(route: string) {
    this.router.navigate([route]);
    this.closeMenu.emit();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
