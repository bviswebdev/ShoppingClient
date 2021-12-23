import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Order, OrderItemData } from '../Model/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderserviceService {
  private readonly orderBaseUri: string = 'http://localhost:8626/api/v1/order';
  constructor(private http: HttpClient) {}

  /*public getOrderJson(): Observable<Order> {
    return this.http.get<Order>('assets/json/orderdata.json');
  }*/

  public getOrderJson(orderId: string): Observable<OrderItemData> {
    return this.http.get<OrderItemData>(`${this.orderBaseUri}/${orderId}`);
  }

  public postOrderJson(orderData: Order): Observable<OrderItemData> {
    const headers = { 'content-type': 'application/json' };

    const body = JSON.stringify(orderData);

    return this.http.post<OrderItemData>(`${this.orderBaseUri}`, body, {
      headers: headers,
    });
  }
}
