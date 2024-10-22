import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { EMPTY, empty, mergeMap, Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { UserDTO } from 'src/app/shared/models/user.dto';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  @Output() openMenu: EventEmitter<void> = new EventEmitter<void>();

  user: UserDTO | undefined;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // this.userService.user
    //   .pipe(
    //     mergeMap((user: UserDTO | undefined) => {
    //       if (user) {
    //         return this.userService.getUserProfilePicture(user.username);
    //       } else return EMPTY;
    //     })
    //   )
    //   .subscribe(user => {
    //     this.user = user;
    //     console.log(user);
    //   });
  }
}
