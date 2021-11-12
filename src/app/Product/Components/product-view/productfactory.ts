import { AuthService } from 'src/app/Services/GlobalService/auth.service';
import { ProductDataService } from '../../Service/productservice.service';
import { Productdatasource } from './productdatasource';

export class Productfactory {}

export const productServiceFactory = (
  productDataService: ProductDataService,
  authService: AuthService
) => {
  const productstream$ = productDataService.getProductsJson();
  //this.products = new Productdatasource(productstream$);
  //this.displayedColumns = this.productView.getDisplayColumnsRoleBased();
  return new Productdatasource(productstream$, authService);
};
