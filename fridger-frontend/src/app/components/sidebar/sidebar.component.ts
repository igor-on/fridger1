import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  credentials!: { sub: string; iat: number; exp: number };

  constructor(private authService: AuthService) {}

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
  }

  onLogOut() {
    this.authService.logout();
  }
}
