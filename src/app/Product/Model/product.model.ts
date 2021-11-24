export class Product {
  constructor(
    public _id: string = '',
    public code: string = '',
    public name: string = '',
    public brand: string = '',
    public description: string = '',
    public unitPrice: number = 0.0,
    public quantity: number = 0,
    public fileName: string = '',
    public fileType: string = '',
    public fileSize: number = 0,
    public fileSource: any = '',
    public isActive: boolean = false,
    public category: Category = new Category(),
    public supplierId: string = '',
    public purchases: number = 0,
    public views: number = 0,
    public imageUrl: string = ''
  ) {}
}

export class Category {
  constructor(
    public id: string = '',
    public catName: string = '',
    public catDesc: string = '',
    public catImgUrl: string = '',
    public catActive: boolean = false
  ) {}
}
