import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from 'src/app/Services/GlobalService/auth.service';
import { MedicareappService } from 'src/app/Services/GlobalService/medicareapp.service';
import { UserLoginInfo, UserLoginRes } from '../../Model/user.model';
import { UserService } from '../../Service/userservice.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  form!: FormGroup;
  public loginInvalid!: boolean;
  private formSubmitAttempt!: boolean;
  private returnUrl!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public userService: UserService,
    public medAppService: MedicareappService
  ) {}

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(12),
        ],
      ],
    });

    this.returnUrl = this.route.snapshot.queryParams.returnUrl;

    /* if (await this.authService.checkAuthenticated()) {
      await this.router.navigate([this.returnUrl]);
    }*/
  }

  appSignIn(): void {
    //this.authService.setAdminToSessionStorage('admin', 'test');
  }

  appSignOut(): void {
    this.authService.resetAuthSessionStorage();
    this.router.navigate(['/medicare/signin']);
  }

  async onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;

    if (this.form.valid) {
      let userLoginInfo: UserLoginInfo;
      userLoginInfo = {
        email: this.username?.value,
        password: this.password?.value,
      };

      this.userService
        .postUserLoginJson(userLoginInfo)
        .pipe(
          map((data: UserLoginRes) => {
            return data;
          }),
          catchError((err) => {
            if (err.error.msg === 'Invalid Credentials') {
              this.loginInvalid = true;
            }
            throw 'error in source. Details: ' + err;
          })
        )
        .subscribe(
          (data) => {
            if (data) {
              if (data.statusMsg === 'success') {
                if (data.data.user.role === 'ADMIN') {
                  this.authService.setAdminToSessionStorage(
                    data.data.role,
                    data.data.token,
                    data.data.email,
                    data.data.userName
                  );
                  this.medAppService.setAppUser = data.data.user;
                  if (data.data.cart) {
                    this.medAppService.setAppCart = data.data.cart;
                  }
                  this.router.navigate(['/admin']);
                }
                //this.router.navigate(['/medicare/signin']);
                else if (data.data.user.role === 'USER') {
                  this.authService.setUserToSessionStorage(
                    data.data.role,
                    data.data.token,
                    data.data.email,
                    data.data.userName
                  );
                  this.medAppService.setAppUser = data.data.user;

                  if (data.data.cart) {
                    this.medAppService.setAppCart = data.data.cart;
                  }

                  this.router.navigate(['/customer']);
                }
                //this.router.navigate(['/medicare/signin']);
                else {
                  this.loginInvalid = true;
                }
              }
            }
          },
          (err) => {
            console.error('Oops:', err);
            if (!this.loginInvalid) {
              this.router.navigate(['/apperror']);
            }
          }
        );
    } else {
      this.formSubmitAttempt = true;
    }
  }
}
