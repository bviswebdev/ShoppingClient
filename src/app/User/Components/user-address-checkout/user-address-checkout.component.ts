import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { MedicareappService } from 'src/app/Services/GlobalService/medicareapp.service';
import { Address, User } from '../../Model/user.model';
import { AddressService } from '../../Service/addressservice.service';
import { UserService } from '../../Service/userservice.service';

@Component({
  selector: 'app-user-address-checkout',
  templateUrl: './user-address-checkout.component.html',
  styleUrls: ['./user-address-checkout.component.scss'],
})
export class UserAddressCheckoutComponent implements OnInit {
  formAddress!: FormGroup;
  public formSubmitAttempt!: boolean;
  formAddressSubmitAttempt!: boolean;
  public userObj: User = new User();
  public isDataLoaded: boolean = false;

  public formError!: boolean;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService,
    public addressService: AddressService,
    public med: MedicareappService
  ) {}

  ngOnInit(): void {
    this.userObj = this.med.appUser;
    console.log('checking user obj');
    console.log(this.med.appUser);
    //this.subscribeUser();
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
    console.log(this.userObj);
    this.isDataLoaded = true;
  }

  subscribeUser() {
    this.userService
      .getUsersJson()
      .pipe(tap((data) => console.log(data)))
      .subscribe((data) => {
        this.userObj = data[3];
        console.log(this.userObj);
        this.isDataLoaded = true;
      });
  }

  keyPasscodePress(event: any) {
    const pattern = /[0-9]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
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

  selectAddress(addressId: string) {
    this.userObj.addresses[0].isShipping = true;
    this.med.setAppUser = this.userObj;
    this.router.navigate(['/customer/payment']);

    /*let addrIndex = this.userObj.addresses.findIndex((addr) => {
      addr.id === addressId;
    });
    if (addrIndex !== -1) {
      this.userObj.addresses[addrIndex].isShipping = true;
      this.med.setAppUser = this.userObj;
    }*/
  }

  async submitForm() {
    this.formSubmitAttempt = true;
    this.formError = false;

    // stop here if form is invalid
    if (this.formAddress.invalid) {
      this.formError = true;
      return;
    }

    try {
      //this.userObj.addresses = [];
      let addrObj: Address = new Address();
      addrObj.id = '';
      addrObj.addressLineOne = this.addrlineone?.value;
      addrObj.addressLineTwo = this.addrlinetwo?.value;
      addrObj.city = this.city?.value;
      addrObj.country = this.country?.value;
      addrObj.state = this.state?.value;
      addrObj.postalCode = this.postalcode?.value;
      addrObj.isBilling = true;
      addrObj.isShipping = true;
      this.userObj.addresses.push(addrObj);
      console.log(this.userObj);
      //this.router.navigate(['/medicare']);

      // await this.authService.login(username, password);
    } catch (err) {
      console.log(err);
    }
  }
}
