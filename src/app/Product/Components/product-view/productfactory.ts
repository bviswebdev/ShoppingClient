import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/GlobalService/auth.service';
import { ProductDataService } from '../../Service/productservice.service';
import { Productdatasource } from './productdatasource';

export class Productfactory {}

export const productServiceFactory = (
  productDataService: ProductDataService,
  authService: AuthService,
  route: ActivatedRoute
) => {
  //let categoryIdFromRoute!: string | null;
  //console.log('router');
  //console.log(route);
  /*route.params.subscribe((routeParams) => {
    categoryIdFromRoute = routeParams.categoryId;
  });*/
  const routeParams = route.snapshot.paramMap;
  const categoryIdFromRoute = routeParams.get('categoryId');
  // console.log(`categoryid is - ${categoryIdFromRoute}`);
  const productstream$ = productDataService.getProductsJson();

  if (categoryIdFromRoute) {
    return new Productdatasource(
      productstream$,
      authService,
      categoryIdFromRoute
    );
  }
  //this.products = new Productdatasource(productstream$);
  //this.displayedColumns = this.productView.getDisplayColumnsRoleBased();
  return new Productdatasource(productstream$, authService, null);
};
