import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/GlobalService/auth.service';
import { BreakpointService } from 'src/app/Services/GlobalService/breakpoint.service';
import { identityRevealedValidator } from '../user-register/confpass.validator';
import { PasswordErrorStateMatcher } from '../user-register/passerrorstate.matcher';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.scss'],
})
export class UserSignupComponent implements OnInit {
  firstFormGroup!: FormGroup;
  formRegister!: FormGroup;
  formAddress!: FormGroup;
  public formSubmitAttempt!: boolean;
  private returnUrl!: string;
  confirmPasswordMatcher = new PasswordErrorStateMatcher();
  //@ViewChild('stepper') private myStepper: MatStepper;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public breakPointService: BreakpointService
  ) {}

  get firstname() {
    return this.formRegister.get('firstname');
  }

  get lastname() {
    return this.formRegister.get('lastname');
  }

  get email() {
    return this.formRegister.get('email');
  }

  get contactnumber() {
    return this.formRegister.get('contactnumber');
  }

  get password() {
    return this.formRegister.get('password');
  }

  get confirmpassword() {
    return this.formRegister.get('confirmpassword');
  }

  get selectrole() {
    return this.formRegister.get('selectrole');
  }

  get addrlineone() {
    return this.formAddress.get('addrlineone');
  }

  get addrlinetwo() {
    return this.formAddress.get('addrlinetwo');
  }

  get city() {
    return this.formAddress.get('city');
  }

  get postalcode() {
    return this.formAddress.get('postalcode');
  }

  get state() {
    return this.formAddress.get('state');
  }

  get country() {
    return this.formAddress.get('country');
  }

  /*get registerform() {
    return this.formRegister;
  }*/

  moveStepper(index: number, stepper: MatStepper) {
    stepper.selectedIndex = index;
  }

  submitPersonal(): void {
    this.formSubmitAttempt = true;
  }

  keyConfirmPasswordPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  keyPasscodePress(event: any) {
    const pattern = /[0-9]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  ngOnInit(): void {
    this.formRegister = this.fb.group(
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

    this.formAddress = this.fb.group({
      addrlineone: ['', [Validators.required]],
      addrlinetwo: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postalcode: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(2),
          Validators.maxLength(6),
        ],
      ],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    this.formSubmitAttempt = true;

    // stop here if form is invalid
    if (this.formRegister.invalid) {
      return;
    }

    try {
      console.log(this.formRegister);

      //this.router.navigate(['/medicare']);

      // await this.authService.login(username, password);
    } catch (err) {
      console.log(err);
    }
  }
}
