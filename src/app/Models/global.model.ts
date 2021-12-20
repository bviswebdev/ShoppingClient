import { Injectable } from '@angular/core';
import { Cart } from '../Cart/Model/cart.model';
import { Order } from '../Order/Model/order.model';
import { User } from '../User/Model/user.model';

export class Breakpoints {
  constructor(
    public xs: boolean = false,
    public sm: boolean = false,
    public md: boolean = false,
    public lg: boolean = false,
    public xl: boolean = false
  ) {}
}

export class Auth {
  constructor(
    public isAuthenticated: boolean = false,
    public role: string = '',
    public isUser: boolean = false,
    public isAdmin: boolean = false,
    public authToken: string = '',
    public email: string = '',
    public userName: string = ''
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class MedicareApp {
  constructor(
    public user: User = new User(),
    public cart: Cart = new Cart(),
    public order: Order = new Order()
  ) {}
}
