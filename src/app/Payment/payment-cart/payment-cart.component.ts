import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { Cart } from 'src/app/Cart/Model/cart.model';
import {
  Order,
  OrderItem,
  OrderItemData,
} from 'src/app/Order/Model/order.model';
import { OrderserviceService } from 'src/app/Order/Service/orderservice.service';
import { MedicareappService } from 'src/app/Services/GlobalService/medicareapp.service';
import { User } from 'src/app/User/Model/user.model';

@Component({
  selector: 'app-payment-cart',
  templateUrl: './payment-cart.component.html',
  styleUrls: ['./payment-cart.component.scss'],
})
export class PaymentCartComponent implements OnInit {
  userCart: Cart = new Cart();
  isDataLoaded: boolean = false;
  formPayment!: FormGroup;
  orderObj: Order = new Order();
  userObj: User = new User();

  constructor(
    public medAppService: MedicareappService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderserviceService
  ) {}

  ngOnInit(): void {
    this.userCart = this.medAppService.appUserCart;
    this.userObj = this.medAppService.appUser;
    this.orderObj = this.medAppService.appUserOrder;
    this.formPayment = this.fb.group({
      paymentname: [''],
      paymentcard: [''],
      paymentcvc: [''],
      paymentexpmonth: [''],
      paymentexpyear: [''],
    });
    this.isDataLoaded = true;
  }

  payForm() {
    if (this.userCart) {
      this.orderObj.orderCount = this.userCart.cartItems.reduce<number>(
        (acc, ct, i, arr) => {
          acc = acc + ct.productCount;
          return acc;
        },
        0
      );
      this.orderObj.orderDate = new Date().toString();
      this.orderObj.orderTotal = this.userCart.grandTotal;
      this.orderObj.userId = this.userObj._id || '';
      this.userCart.cartItems.forEach((item) => {
        let orderItem: OrderItem = new OrderItem();
        orderItem.productCount = item.productCount;
        orderItem.productId = item.productId;
        orderItem.productName = item.cartItemProduct.productName;
        orderItem.total = item.itemTotal;
        orderItem.buyingPrice = item.buyingPrice;
        this.orderObj.orderItems.push(orderItem);
      });
    }

    this.orderService
      .postOrderJson(this.orderObj)
      .pipe(
        map((data: OrderItemData) => {
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
              //this.medAppService.setAppCart = this.userCart;
              this.medAppService.setAppUserOrder = this.orderObj;
              this.router.navigate(['/customer/orderconfirm']);
              //this.router.navigate(['/customer/cart']);
            }
          }
        },
        (err) => {
          console.error('Oops:', err.message);
          this.router.navigate(['/apperror']);
        }
      );
  }
}
