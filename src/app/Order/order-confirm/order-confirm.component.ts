import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { Auth } from 'src/app/Models/global.model';
import { MedicareappService } from 'src/app/Services/GlobalService/medicareapp.service';
import { Address, User } from 'src/app/User/Model/user.model';
import { Order } from '../Model/order.model';
import { OrderserviceService } from '../Service/orderservice.service';
import { AuthService } from 'src/app/Services/GlobalService/auth.service';
import { CartServiceService } from 'src/app/Cart/Service/cart-service.service';
import { Cart, CartItemData } from 'src/app/Cart/Model/cart.model';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.scss'],
})
export class OrderConfirmComponent implements OnInit {
  orderObj: Order = new Order();
  userObj: User = new User();

  isDataLoaded: boolean = false;
  shippingAddress: Address = new Address();
  billingAddress: Address = new Address();

  constructor(
    public medAppService: MedicareappService,
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderserviceService,
    public authService: AuthService,
    private cartService: CartServiceService
  ) {}

  ngOnInit(): void {
    this.orderObj = this.medAppService.appUserOrder;
    this.userObj = this.medAppService.appUser;
    this.shippingAddress =
      this.medAppService.appUser.addresses.find(
        (addr) => addr._id === this.orderObj.shippingId
      ) || this.shippingAddress;

    this.billingAddress =
      this.medAppService.appUser.addresses.find(
        (addr) => addr._id === this.orderObj.billingId
      ) || this.billingAddress;

    this.cartService.deleteCartJson(this.medAppService.appUserCart);

    this.cartService
      .deleteCartJson(this.medAppService.appUserCart)
      .pipe(
        map((data: CartItemData) => {
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
              this.medAppService.setAppCart = new Cart();
              //this.isCartEmpty = true;
              //this.router.navigate(['/customer/cart']);
              this.isDataLoaded = true;
            }
          }
        },
        (err) => {
          console.error('Oops:', err.message);
          this.router.navigate(['/apperror']);
        }
      );

    /* this.orderService
      .getOrderJson()
      .pipe(
        map((od: Order) => {
          return od;
        })
      )
      .subscribe((data) => {
        this.orderObj = data;
        this.isDataLoaded = true;
      })*/
  }
}
