export interface CartItemData {
  statusMsg?: string;
  data?: Cart;
}

export class Cart {
  constructor(
    public _id: string = '',
    public userId: string = '',
    public grandTotal: number = 0,
    public cartItems: Array<CartItem> = new Array<CartItem>()
  ) {}
}

export class CartItem {
  constructor(
    public _id: string = '',
    public itemId: string = '',
    public itemTotal: number = 0,
    public productId: string = '',
    public productCount: number = 0,
    public buyingPrice: number = 0,
    public isAvailable: boolean = false,
    public cartItemProduct: CartItemProduct = new CartItemProduct()
  ) {}
}

export class CartItemProduct {
  constructor(
    public _id: string = '',
    public productCode: string = '',
    public productImageUrl: string = '',
    public productName: string = '',
    public productBrand: string = '',
    public productDescription: string = '',
    public productPrice: number = 0,
    public productQtyAvailable = 0
  ) {}
}
