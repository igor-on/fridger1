import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Component, EventEmitter, Output } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Output() closeMenu = new EventEmitter<void>();

  credentials!: { sub: string; iat: number; exp: number };

  profilePicture!: SafeUrl;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private sanitazer: DomSanitizer
  ) {}

  ngOnInit(): void {}

  onLogOut() {
    this.authService.logout();
  }
}
