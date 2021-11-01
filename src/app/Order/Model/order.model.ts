export class Order {
  constructor(
    public id: string,
    public userId: string,
    public orderTotal: number,
    public orderCount: number,
    public shippingId: string,
    public billingId: string,
    public orderItems: Array<OrderItem>,
    public orderDate: string
  ) {}
}

export class OrderItem {
  constructor(
    public itemId: string,
    public total: number,
    public productId: string,
    public productCount: number,
    public buyingPrice: number
  ) {}
}
