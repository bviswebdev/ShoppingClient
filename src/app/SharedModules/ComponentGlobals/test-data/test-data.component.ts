import { Component, Input, OnInit } from '@angular/core';
import { Cart } from 'src/app/Models/cart.model';
import { Order } from 'src/app/Models/order.model';
import { Product } from 'src/app/Models/product.model';
import { User } from 'src/app/Models/user.model';
import { LoaddataService } from 'src/app/Services/TestDataService/loaddata.service';
import { Loadtestdata } from './TestDataClass/loadtestdata';

@Component({
  selector: 'app-test-data',
  templateUrl: './test-data.component.html',
  styleUrls: ['./test-data.component.scss'],
  providers: [{ provide: Loadtestdata, useClass: Loadtestdata }],
})
export class TestDataComponent implements OnInit {
  @Input('showData')
  dataFor: string = '';

  users: Array<User> = new Array<User>();
  products: Array<Product> = new Array<Product>();
  cart?: Cart;
  order?: Order;
  showData: any = {};

  constructor(private loadTestData: Loadtestdata) {}

  ngOnInit(): void {
    this.loadTestData.loadSampleData(this.dataFor);
    this.subscribeData(this.dataFor);
    this.showData = this.loadTestData.showData;
  }

  private subscribeData(subVal: string): void {
    switch (subVal) {
      case 'user':
        this.subscribeUser();
        break;
      case 'product':
        this.subscribeProduct();
        break;
      case 'cart':
        this.subscribeCart();
        break;
      case 'order':
        this.subscribeOrder();
        break;
      default:
    }
  }

  private subscribeUser(): void {
    this.loadTestData.users.subscribe((data) => {
      this.users = data;
    });
  }

  private subscribeProduct(): void {
    this.loadTestData.products.subscribe((data) => {
      this.products = data;
    });
  }

  private subscribeCart(): void {
    this.loadTestData.cart.subscribe((data) => {
      this.cart = data;
    });
  }

  private subscribeOrder(): void {
    this.loadTestData.order.subscribe((data) => {
      this.order = data;
    });
  }
}
