export interface OrderItemData {
  statusMsg?: string;
  data?: Order;
}

export class Order {
  constructor(
    public id: string = '',
    public userId: string = '',
    public orderTotal: number = 0,
    public orderCount: number = 0,
    public shippingId: string = '',
    public billingId: string = '',
    public orderItems: Array<OrderItem> = new Array<OrderItem>(),
    public orderDate: string = ''
  ) {}
}

export class OrderItem {
  constructor(
    public itemId: string = '',
    public total: number = 0,
    public productId: string = '',
    public productCount: number = 0,
    public buyingPrice: number = 0,
    public productName: string = ''
  ) {}
}
