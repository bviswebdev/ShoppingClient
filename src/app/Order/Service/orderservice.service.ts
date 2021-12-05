import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Order } from '../Model/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderserviceService {
  constructor(private http: HttpClient) {}

  public getOrderJson(): Observable<Order> {
    return this.http.get<Order>('assets/json/orderdata.json');
  }
}
