import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { MedicareappService } from 'src/app/Services/GlobalService/medicareapp.service';
import { Address, User } from 'src/app/User/Model/user.model';
import { Order } from '../Model/order.model';
import { OrderserviceService } from '../Service/orderservice.service';

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

  constructor(
    public medAppService: MedicareappService,
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderserviceService
  ) {}

  ngOnInit(): void {
    //this.orderObj = this.medAppService.appUserOrder;
    /* this.shippingAddress =
      this.medAppService.appUser.addresses.find(
        (addr) => addr.isShipping === true
      ) || this.shippingAddress;*/

    this.orderService
      .getOrderJson()
      .pipe(
        map((od: Order) => {
          return od;
        })
      )
      .subscribe((data) => {
        this.orderObj = data;
        this.isDataLoaded = true;
      });
  }
}
