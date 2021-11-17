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
      password: ['', Validators.required],
    });

    this.returnUrl = this.route.snapshot.queryParams.returnUrl;

    /* if (await this.authService.checkAuthenticated()) {
      await this.router.navigate([this.returnUrl]);
    }*/
  }

  async onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;

    if (this.form.valid) {
      try {
        const username = this.form.get('username')
          ? this.form.get('username')?.value
          : '';
        const password = this.form.get('password')
          ? this.form.get('password')?.value
          : '';

        console.log(this.form);
        console.log(username);
        console.log(password);
        // await this.authService.login(username, password);
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}
