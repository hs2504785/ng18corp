import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterModule,
} from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HeaderComponent } from './layout/header/header.component';
import {
  LoaderComponent,
  LoaderService,
  ToastComponent,
} from '@lib/components';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    NxWelcomeComponent,
    RouterModule,
    HeaderComponent,
    LoaderComponent,
    ToastComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private loaderService = inject(LoaderService);
  title = 'rochlab';
  sub!: Subscription;

  ngOnInit(): void {
    this.initRouteEvents();
  }

  initRouteEvents() {
    const routerEventSub = this.router.events.subscribe((event: any) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loaderService.show();
          break;
        }

        case event instanceof NavigationEnd: {
          this.loaderService.hide();
          break;
        }
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loaderService.hide();
          break;
        }
        default: {
          break;
        }
      }
    });

    this.sub?.add(routerEventSub);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
