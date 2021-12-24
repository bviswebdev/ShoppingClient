import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/GlobalService/auth.service';
import { identityRevealedValidator } from './confpass.validator';
import { PasswordErrorStateMatcher } from './passerrorstate.matcher';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent implements OnInit {
  form!: FormGroup;
  public formSubmitAttempt!: boolean;
  private returnUrl!: string;
  confirmPasswordMatcher = new PasswordErrorStateMatcher();
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  get firstname() {
    return this.form.get('firstname');
  }

  get lastname() {
    return this.form.get('lastname');
  }

  get email() {
    return this.form.get('email');
  }

  get contactnumber() {
    return this.form.get('contactnumber');
  }

  get password() {
    return this.form.get('password');
  }

  get confirmpassword() {
    return this.form.get('confirmpassword');
  }

  get selectrole() {
    return this.form.get('selectrole');
  }

  get registerform() {
    return this.form;
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        contactnumber: [
          '',
          [
            Validators.required,
            Validators.pattern('^[0-9]*$'),
            Validators.minLength(10),
            Validators.maxLength(10),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(12),
          ],
        ],
        confirmpassword: ['', [Validators.required]],
        selectrole: ['', [Validators.required]],
      },
      {
        validators: identityRevealedValidator,
      }
    );

    this.returnUrl = this.route.snapshot.queryParams.returnUrl;

    /* if (await this.authService.checkAuthenticated()) {
      await this.router.navigate([this.returnUrl]);
    }*/
  }

  async onSubmit() {
    this.formSubmitAttempt = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    try {
      //this.router.navigate(['/medicare']);
      // await this.authService.login(username, password);
    } catch (err) {}
  }
}
