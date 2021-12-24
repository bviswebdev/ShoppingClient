import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/GlobalService/auth.service';
import { BlobService } from '../../Service/blob.service';
import { ProductDataService } from '../../Service/productservice.service';
import { Productdatasource } from './productdatasource';

export class Productfactory {}

export const productServiceFactory = (
  productDataService: ProductDataService,
  authService: AuthService,
  route: ActivatedRoute,
  blogService: BlobService
) => {
  //let categoryIdFromRoute!: string | null;

  /*route.params.subscribe((routeParams) => {
    categoryIdFromRoute = routeParams.categoryId;
  });*/
  const routeParams = route.snapshot.paramMap;
  const categoryIdFromRoute = routeParams.get('categoryId');

  const productstream$ = productDataService.getProductsJson();

  if (categoryIdFromRoute) {
    return new Productdatasource(
      productstream$,
      authService,
      categoryIdFromRoute,
      blogService
    );
  }
  //this.products = new Productdatasource(productstream$);
  //this.displayedColumns = this.productView.getDisplayColumnsRoleBased();
  return new Productdatasource(productstream$, authService, null, blogService);
};
