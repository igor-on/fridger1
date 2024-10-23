import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
  concatMap,
  EMPTY,
  empty,
  mergeMap,
  Observable,
  Subscription,
  tap,
} from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { UserDTO } from 'src/app/shared/models/user.dto';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Output() openMenu: EventEmitter<void> = new EventEmitter<void>();

  isAuth = false;
  user?: UserDTO;
  userProfilePicture!: SafeUrl;
  subscriptions: Subscription[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    console.log('Navbar component initialized');

    this.subscriptions.push(
      this.userService.authUser
        .pipe(
          tap(authUser => {
            this.isAuth = !!authUser;
          }),
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
      this.userService.profilePictureChanged.subscribe((imgUrl: SafeUrl) => {
        this.userProfilePicture = imgUrl;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
