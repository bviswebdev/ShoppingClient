export class Product {
  constructor(
    public id: string,
    public code: string,
    public name: string,
    public brand: string,
    public description: string,
    public unitPrice: number,
    public Quantity: number,
    public isActive: boolean,
    public category: Category,
    public supplierId: string,
    public purchases: number,
    public views: number
  ) {}
}

export class Category {
  constructor(
    public id: string,
    public catDesc: string,
    public catImgUrl: string,
    public catActive: boolean
  ) {}
}
