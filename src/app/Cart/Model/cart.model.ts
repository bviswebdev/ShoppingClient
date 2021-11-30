export class Cart {
  constructor(
    public id: string = '',
    public userId: string = '',
    public grandTotal: number = 0,
    public cartItems: Array<CartItem> = new Array<CartItem>()
  ) {}
}

export class CartItem {
  constructor(
    public itemId: string = '',
    public itemTotal: number = 0,
    public productId: string = '',
    public productCount: number = 0,
    public buyingPrice: number = 0,
    public isAvailable: boolean = false
  ) {}
}
