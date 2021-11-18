import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/GlobalService/auth.service';

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
    private authService: AuthService
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
    console.log(`return url ${this.returnUrl}`);

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
    console.log(this.form);

    if (this.form.valid) {
      try {
        console.log(this.form);
        if (
          this.username?.value === 'admin@abc.com' &&
          this.password?.value === 'password'
        ) {
          this.authService.setAdminToSessionStorage(
            'admin',
            'test',
            this.username.value
          );
          this.router.navigate(['/medicare']);
        } else if (
          this.username?.value === 'user@abc.com' &&
          this.password?.value === 'password'
        ) {
          this.authService.setUserToSessionStorage(
            'user',
            'test',
            this.username.value
          );
          this.router.navigate(['/medicare']);
        } else {
          this.loginInvalid = true;
        }

        // await this.authService.login(username, password);
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}
