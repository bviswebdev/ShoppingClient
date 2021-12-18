export interface ProductsData {
  statusMsg?: string;
  data?: Array<Product>;
}

export interface ProductData {
  statusMsg?: string;
  data?: Array<Product>;
}

export class Product {
  constructor(
    public _id: string = '',
    public code: string = '',
    public name: string = '',
    public brand: string = '',
    public description: string = '',
    public unitPrice: number = 0.0,
    public quantity: number = 0,
    public productImage: FileInfo = new FileInfo(),
    public isActive: boolean = false,
    public category: Category = new Category(),
    public supplierId: string = '',
    public purchases: number = 0,
    public views: number = 0,
    public imageUrl: string = ''
  ) {}
}

export class FileInfo {
  constructor(
    public _id: string = '',
    public fileName: string = '',
    public fileType: string = '',
    public fileSize: string = '',
    public fileUrl: string = '',
    public fileSource: any = ''
  ) {}
}

export class Category {
  constructor(
    public _id: string = '',
    public catName: string = '',
    public catDesc: string = '',
    public catImgUrl: string = '',
    public catActive: boolean = false
  ) {}
}
