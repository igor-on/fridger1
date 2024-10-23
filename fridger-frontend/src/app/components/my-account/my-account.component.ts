import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Icon } from 'src/app/shared/icons';
import { UserDTO } from 'src/app/shared/models/user.dto';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    RouterModule,
    DatePipe,
  ],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss',
})
export class MyAccountComponent implements OnInit {
  readonly Icon = Icon;

  user!: UserDTO;
  userProfilePicture!: SafeUrl;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log('MyAccount component initialized');
    this.user = this.route.snapshot.data['user'];
    this.userProfilePicture = this.route.snapshot.data['userProfPic'];
  }

  onLogout(): void {
    console.log('Logging out');

    this.authService.logout();
  }
}
