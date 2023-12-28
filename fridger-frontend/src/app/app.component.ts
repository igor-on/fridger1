import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'fridger-frontend';

  @ViewChild('drawer') sidenav!: MatDrawer;

  sidenavMode!: MatDrawerMode;
  // sidenavOpened!: boolean;
  sidenavHidden = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.sidenavMode = window.innerWidth <= 1054 ? 'over' : 'side';

    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(el => {
        if (
          (<NavigationStart>el).url.includes('/recipe-form') &&
          window.innerWidth > 1054
        ) {
          this.sidenavHidden = true;
          this.sidenav.close();
        } else if (window.innerWidth > 1054) {
          this.sidenavHidden = false;
          this.sidenav.open();
        }
      });
  }
  ngAfterViewInit(): void {
    window.innerWidth < 1054 ? this.sidenav.close() : this.sidenav.open();
  }

  @HostListener('window:resize', []) updateSidenav() {
    if (window.innerWidth <= 1024) {
      this.sidenavMode = 'over'; // lg
      // this.sidenavOpened = false;
      this.sidenav.close();
    } else {
      this.sidenavMode = 'side';
      // this.sidenavOpened = true;
      this.sidenav.open();
    }
  }
}
