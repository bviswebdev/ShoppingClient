import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/GlobalService/auth.service';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss'],
})
export class UserAddressComponent implements OnInit {
  form!: FormGroup;
  public formSubmitAttempt!: boolean;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  get addrlineone() {
    return this.form.get('addrlineone');
  }

  get addrlinetwo() {
    return this.form.get('addrlinetwo');
  }

  get city() {
    return this.form.get('city');
  }

  get postalcode() {
    return this.form.get('postalcode');
  }

  get state() {
    return this.form.get('state');
  }

  get country() {
    return this.form.get('country');
  }

  keyPress(event: any) {
    const pattern = /[0-9]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
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
    if (this.form.invalid) {
      return;
    }

    try {
      //this.router.navigate(['/medicare']);
      // await this.authService.login(username, password);
    } catch (err) {}
  }
}
