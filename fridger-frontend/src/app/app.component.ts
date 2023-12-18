import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';

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

  ngOnInit(): void {
    this.sidenavMode = window.innerWidth <= 1054 ? 'over' : 'side';
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
