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
import { Subscription, delay, filter } from 'rxjs';
import { AuthService } from './services/auth.service';
import { MessageService } from './services/message.service';
import { MessageService as PrimengMessageService } from 'primeng/api';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [PrimengMessageService],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'fridger-frontend';

  @ViewChild('drawer') sidenav!: MatDrawer;

  sidenavMode!: MatDrawerMode;
  // sidenavOpened!: boolean;
  sidenavHidden = false;

  mobile = false;

  messageSubscription?: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private primengMessageService: PrimengMessageService
  ) {}

  ngOnInit(): void {
    this.handleMessages();
    this.authService.listenForTokenRefresh();

    this.sidenavMode = window.innerWidth <= 1054 ? 'over' : 'side';

    this.mobile = window.innerWidth <= 1054;

    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(el => {
        if (
          (<NavigationStart>el).url.includes('/recipe-form') &&
          window.innerWidth > 1054
        ) {
          this.sidenavHidden = true;
          this.sidenav.close();
        } else if ((<NavigationStart>el).url.includes('/login')) {
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

  handleMessages() {
    // TODO: move this to app component
    this.messageSubscription = this.messageService.message
      .pipe(delay(100))
      .subscribe(newMessage => {
        console.log(`New message arrived: ${newMessage}`);
        this.primengMessageService.clear();
        this.primengMessageService.add(newMessage);
      });
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
