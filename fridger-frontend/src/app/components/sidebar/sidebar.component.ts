import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  credentials!: { sub: string; iat: number; exp: number };

  profilePicture!: SafeUrl;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private sanitazer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.credentials = jwtDecode<{
        sub: string;
        iat: number;
        exp: number;
      }>(localStorage.getItem('token')!);

      console.log(this.credentials);
    }

    this.userService.getUserProfilePicture()!.subscribe((img: any) => {
      const objectURL = URL.createObjectURL(img);
      this.profilePicture = this.sanitazer.bypassSecurityTrustUrl(objectURL);
      // console.log('profilePicture', this.profilePicture);
    });
  }

  onLogOut() {
    this.authService.logout();
  }
}
