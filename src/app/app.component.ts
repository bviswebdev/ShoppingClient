import { Component } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { BreakpointService } from './Services/GlobalService/breakpoint.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'med-app';
  private mediaSubscription!: Subscription;
  private activeMediaQuery: string = '';
  showMobile: string = '';
  deviceWdith: string = '';

  constructor(
    public mediaObserver: MediaObserver,
    public breakPoint: BreakpointService
  ) {}

  ngOnInit(): void {
    const getAlias = (MediaChange: MediaChange[]) => {
      return MediaChange[0].mqAlias;
    };

    this.mediaSubscription = this.mediaObserver
      .asObservable()
      .subscribe((change) => {
        console.log(change[0].mqAlias);
        this.showMobile = change[0].mqAlias;
        switch (change[0].mqAlias) {
          case 'xs':
            this.breakPoint.setStateXs();
            break;
          case 'sm':
            this.breakPoint.setStateSm();
            break;
          case 'md':
            this.breakPoint.setStateMd();
            break;
          case 'lg':
            this.breakPoint.setStateLg();
            break;
          case 'xl':
            this.breakPoint.setStateXl();
            break;
          default:
        }
        //this.deviceWdith = change[0].mqAlias;
      });
  }

  ngOnDestroy(): void {
    this.mediaSubscription.unsubscribe();
  }
}
