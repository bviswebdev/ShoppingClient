export class Cart {
  constructor(
    public id: string,
    public userId: string,
    public grandTotal: number,
    public cartItems: Array<CartItem>
  ) {}
}

export class CartItem {
  constructor(
    public itemId: string,
    public itemTotal: number,
    public productId: string,
    public productCount: number,
    public buyingPrice: number,
    public isAvilable: boolean
  ) {}
}
