import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/Cart/Model/cart.model';
import { MedicareappService } from 'src/app/Services/GlobalService/medicareapp.service';

@Component({
  selector: 'app-payment-cart',
  templateUrl: './payment-cart.component.html',
  styleUrls: ['./payment-cart.component.scss'],
})
export class PaymentCartComponent implements OnInit {
  userCart: Cart = new Cart();
  isDataLoaded: boolean = false;
  formPayment!: FormGroup;

  constructor(
    public medAppService: MedicareappService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userCart = this.medAppService.appUserCart;
    this.formPayment = this.fb.group({
      paymentname: [''],
      paymentcard: [''],
      paymentcvc: [''],
      paymentexpmonth: [''],
      paymentexpyear: [''],
    });
    this.isDataLoaded = true;
  }

  payForm() {}
}
