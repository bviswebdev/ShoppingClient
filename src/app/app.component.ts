import { Component } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { catchError, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { AuthService } from './Services/GlobalService/auth.service';
import { BreakpointService } from './Services/GlobalService/breakpoint.service';
import { MedicareappService } from './Services/GlobalService/medicareapp.service';
import { UserLoginRes } from './User/Model/user.model';
import { UserService } from './User/Service/userservice.service';

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
    public breakPoint: BreakpointService,
    public authService: AuthService,
    public userService: UserService,
    public med: MedicareappService,
    public router: Router
  ) {}

  subscribeUser() {
    this.userService.getUsersJson().subscribe((data) => {
      this.med.setAppUser = data[3];
    });
  }

  ngOnInit(): void {
    this.authService.getAuthFromSessionStorage();
    if (
      this.authService.IsAuthenticated &&
      this.authService.AuthToken &&
      this.authService.Email
    ) {
      this.userService
        .getUserLoginJson(this.authService.Email)
        .pipe(
          map((data: UserLoginRes) => {
            return data;
          }),
          catchError((err) => {
            throw 'error in source. Details: ' + err;
          })
        )
        .subscribe(
          (data) => {
            if (data) {
              if (data.statusMsg === 'success') {
                this.med.setAppUser = data.data.user;
                if (data.data.cart) {
                  this.med.setAppCart = data.data.cart;
                }
              } //this.router.navigate(['/medicare/signin']);
            }
          },
          (err) => {
            console.error('Oops:', err.message);
            this.router.navigate(['/apperror']);
          }
        );
    }
    //this.subscribeUser();

    const getAlias = (MediaChange: MediaChange[]) => {
      return MediaChange[0].mqAlias;
    };

    this.mediaSubscription = this.mediaObserver
      .asObservable()
      .subscribe((change) => {
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
