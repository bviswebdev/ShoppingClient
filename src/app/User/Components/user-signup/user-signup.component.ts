import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { HttpResponse } from '@angular/common/http';
import { IfStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from 'src/app/Services/GlobalService/auth.service';
import { BreakpointService } from 'src/app/Services/GlobalService/breakpoint.service';
import { MedicareappService } from 'src/app/Services/GlobalService/medicareapp.service';
import { Address, User, UserSignup } from '../../Model/user.model';
import { AddressService } from '../../Service/addressservice.service';
import { Userasyncvalidators } from '../../Service/userasyncValidators';
import { UserService } from '../../Service/userservice.service';
import { identityRevealedValidator } from '../user-register/confpass.validator';
import { PasswordErrorStateMatcher } from '../user-register/passerrorstate.matcher';
import { UserSnackComponent } from '../user-snack/user-snack.component';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.scss'],
})
export class UserSignupComponent implements OnInit {
  formRegister!: FormGroup;
  formAddress!: FormGroup;
  public formSubmitAttempt!: boolean;
  formPersonalSubmitAttempt!: boolean;
  formAddressSubmitAttempt!: boolean;
  public formError!: boolean;
  private returnUrl!: string;
  public userObj: User = new User();
  public addrObj: Address = new Address();

  confirmPasswordMatcher = new PasswordErrorStateMatcher();
  //@ViewChild('stepper') private myStepper: MatStepper;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public breakPointService: BreakpointService,
    public userService: UserService,
    public addressService: AddressService,
    public med: MedicareappService,
    private addSnackBar: MatSnackBar
  ) {}

  get fullname() {
    return (
      this.formRegister.get('firstname')?.value +
      '' +
      this.formRegister.get('lastname')?.value
    );
  }

  get citywithzip() {
    return (
      this.formAddress.get('city')?.value +
      ' - ' +
      this.formAddress.get('postalcode')?.value
    );
  }

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

  submitPersonal(stepper: MatStepper): void {
    this.formPersonalSubmitAttempt = true;
    if (!this.formRegister.valid) {
      return;
    }
    this.formPersonalSubmitAttempt = false;
    stepper.next();
  }

  submitAddress(stepper: MatStepper, action: string): void {
    this.formAddressSubmitAttempt = true;
    if (!this.formAddress.valid) {
      return;
    }
    this.formAddressSubmitAttempt = false;
    if (action === 'next') stepper.next();
    else stepper.previous();
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
        email: [
          '',
          {
            validators: [Validators.required, Validators.email],
            asyncValidators: Userasyncvalidators.createEmailExistsValidator(
              this.userService
            ),
            updateOn: 'blur',
          },
        ],
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

  selectionChange(event: StepperSelectionEvent, stepper: MatStepper) {
    if (stepper.selectedIndex === 2) {
      return;
    }

    if (stepper.selectedIndex === 0 && this.formRegister.valid) {
      //this.userObj._id = '';
      this.userObj.firstName = this.firstname?.value;
      this.userObj.lastName = this.lastname?.value;
      this.userObj.email = this.email?.value;
      this.userObj.contactNumber = this.contactnumber?.value;
      this.userObj.password = this.password?.value;
      this.userObj.enabled = true;
      this.userObj.role = this.selectrole?.value.toUpperCase();

      return;
    }

    if (stepper.selectedIndex === 1 && this.formAddress.valid) {
      this.userObj.addresses = [];
      //this.addrObj._id = '';
      this.addrObj.addressLineOne = this.addrlineone?.value;
      this.addrObj.addressLineTwo = this.addrlinetwo?.value;
      this.addrObj.city = this.city?.value;
      this.addrObj.country = this.country?.value;
      this.addrObj.state = this.state?.value;
      this.addrObj.postalCode = this.postalcode?.value;
      this.addrObj.isBilling = true;
      this.addrObj.isShipping = true;
      this.userObj.addresses.push(this.addrObj);
      return;
    }
  }

  async submitForm() {
    this.formSubmitAttempt = true;
    this.formError = false;

    // stop here if form is invalid
    if (this.formRegister.invalid || this.formAddress.invalid) {
      this.formError = true;
      return;
    }

    this.userService
      .postUserJson(this.userObj)
      .pipe(
        map((data: UserSignup) => {
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
              this.addSnackBar.openFromComponent(UserSnackComponent, {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
                data: 'Succesfully registered please login to continue.',
              });
              this.router.navigate(['/medicare/signin']);
            }
          }
        },
        (err) => {
          console.error('Oops:', err.message);
          this.router.navigate(['/apperror']);
        }
      );
    //this.router.navigate(['/medicare']);

    // await this.authService.login(username, password);
  }
}
