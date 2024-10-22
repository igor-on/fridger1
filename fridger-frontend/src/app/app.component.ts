import {
  AfterViewInit,
  Component,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';
import {
  ActivatedRoute,
  ChildrenOutletContexts,
  NavigationStart,
  Router,
} from '@angular/router';
import { Subscription, delay, filter } from 'rxjs';
import { AuthService } from './services/auth.service';
import { MessageService } from './services/message.service';
import { MessageService as PrimengMessageService } from 'primeng/api';
import { rightSlideInOutAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [PrimengMessageService],
  animations: [rightSlideInOutAnimation],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'fridger-frontend';

  @ViewChild('drawer') sidenav!: MatDrawer;

  sidenavMode!: MatDrawerMode;
  // sidenavOpened!: boolean;
  sidenavHidden = false;

  mobile = true;

  messageSubscription?: Subscription;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private primengMessageService: PrimengMessageService,
    private contexts: ChildrenOutletContexts
  ) {}

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }

  ngOnInit(): void {
    console.log('App component initialized');

    this.handleMessages();
    this.authService.listenForTokenRefresh();
    this.authService.autologin();

    // this.sidenavMode = window.innerWidth <= 1054 ? 'over' : 'side';
    console.log(window.innerWidth);
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
    // this.sidenav.open();
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
