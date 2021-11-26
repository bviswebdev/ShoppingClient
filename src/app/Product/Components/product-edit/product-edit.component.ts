import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/Services/GlobalService/auth.service';
import { Category, Product } from '../../Model/product.model';
import { DtsErrorStateMatcher } from '../../Service/errorstatematcher';
import { PdbrandasyncValidator } from '../../Service/pdbrandasync-validator.service';
import { Productasyncvalidators } from '../../Service/productasyncvalidators';
import { ProductDataService } from '../../Service/productservice.service';
import {
  fileFormatValidator,
  fileSizeValidator,
} from '../../Service/productsyncvalidators';
import { ProductAddcategoryComponent } from '../product-addcategory/product-addcategory.component';
import { ProductSnackComponent } from '../product-snack/product-snack.component';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  formProductEdit!: FormGroup;
  public formSubmitAttempt!: boolean;
  public fileUploadAttempt!: boolean;
  fileName = '';
  selectMatcher = new DtsErrorStateMatcher();
  categories: Array<Category> = new Array<Category>();
  public productObj: Product = new Product();
  public selectedCategory: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private pdbrndValidator: PdbrandasyncValidator,
    private productDataService: ProductDataService,
    public dialog: MatDialog,
    private addSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.pdbrndValidator.productService = this.productDataService;
    this.formProductEdit = this.fb.group(
      {
        productname: ['', [Validators.required, Validators.maxLength(30)]],
        brandname: ['', [Validators.required, Validators.maxLength(30)]],
        description: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(50),
          ],
        ],
        unitprice: [
          '',
          [
            Validators.required,
            //Validators.pattern(/^[0-9]+\.[0-9]{2}$/),
            Validators.pattern('^([0-9]+|[0-9]+.[0-9]{1,2})$'),
          ],
        ],
        quantity: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        filesource: [
          '',
          [Validators.required, fileFormatValidator, fileSizeValidator],
        ],
        fileupload: [''],
        category: ['', [Validators.required]],
      },
      {
        validators: null,
        asyncValidators: Productasyncvalidators.createProductBrandValidator(
          this.productDataService
        ),

        updateOn: 'blur',
      }
    );

    this.categories = [];
    //this.subscribeCategory();
    //this.subscribeProduct();
    this.forkProductAndCategory();
  }

  openDialog() {
    let dialogRef = this.dialog.open(ProductAddcategoryComponent, {
      height: '350px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`); // Pizza!
      if (result && result.categoryname) {
        let categoryTemp: Category = new Category();
        categoryTemp.catName = result.categoryname;
        categoryTemp.catDesc = result.description;
        this.categories.push(categoryTemp);
      }
    });
  }

  onFileSelected(event: any) {
    console.log('iam selected');
    const file: File = event.target.files[0];
    if (file) {
      console.log(file);
      this.fileName = file.name;
      this.formProductEdit.patchValue({
        filesource: file,
      });
    }

    this.fileUploadAttempt = true;

    /*if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        formData.append("thumbnail", file);

        const upload$ = this.http.post("/api/thumbnail-upload", formData);

        upload$.subscribe();
    }*/
  }

  private forkProductAndCategory(): void {
    forkJoin([
      this.forkSubscribeCategory(),
      this.forkSubscribeProduct(),
    ]).subscribe(
      (res) => {
        if (res[0]) {
          let resultArr = _.uniqBy(res[0], (obj) => obj.catName);
          resultArr = _.sortBy(resultArr, 'catName');
          this.categories = resultArr;
          console.log(this.categories);
        }
        if (res[1] && res[1][0]) {
          this.productObj = res[1][0];
          console.log(this.productObj);
          this.formProductEdit.patchValue({
            productname: this.productObj.name,
            brandname: this.productObj.brand,
            description: this.productObj.description,
            unitprice: this.productObj.unitPrice,
            quantity: this.productObj.quantity,
            category: this.productObj.category.catName,
          });
          this.fileName = this.productObj.fileName || 'testfile.png';
        }
        console.log(this.category);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  private forkSubscribeProduct(): Observable<Array<Product>> {
    return this.productDataService.getProductsJson().pipe(
      map((prods: Array<Product>) => {
        return prods.filter(
          (prod) => prod.name === 'Paracetamol' && prod.brand === 'Cipla'
        );
      })
    );
  }

  private forkSubscribeCategory(): Observable<Array<Category>> {
    return this.productDataService.getProductsJson().pipe(
      map((products: Array<Product>) => {
        return products.map((product) => product.category);
      })
    );
  }

  get productname() {
    return this.formProductEdit.get('productname');
  }

  get brandname() {
    return this.formProductEdit.get('brandname');
  }

  get description() {
    return this.formProductEdit.get('description');
  }

  get unitprice() {
    return this.formProductEdit.get('unitprice');
  }

  get quantity() {
    return this.formProductEdit.get('quantity');
  }

  get category() {
    return this.formProductEdit.get('category');
  }

  get filesource() {
    return this.formProductEdit.get('filesource');
  }

  get fileupload() {
    return this.formProductEdit.get('fileupload');
  }

  async onProductEditFormSubmit() {
    this.formSubmitAttempt = true;
    console.log(this.formProductEdit);

    // stop here if form is invalid
    if (this.formProductEdit.invalid) {
      return;
    }

    try {
      console.log(this.formProductEdit);
      this.productObj.brand = this.brandname?.value;
      this.productObj.description = this.description?.value;
      this.productObj.name = this.productname?.value;
      this.productObj.isActive = true;
      this.productObj.quantity = this.quantity?.value;
      this.productObj.unitPrice = this.unitprice?.value;
      this.productObj.category = this.category?.value;
      this.productObj.fileSource = this.filesource?.value;
      this.productObj.fileName = this.filesource?.value.name;
      this.productObj.fileSize = this.filesource?.value.size;
      this.productObj.fileType = this.filesource?.value.type;
      console.log(this.productObj);
      this.addSnackBar.openFromComponent(ProductSnackComponent, {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        data: 'Product updated press cancel to go back to view changes.',
      });
      //this.router.navigate(['/medicare']);

      // await this.authService.login(username, password);
    } catch (err) {
      console.log(err);
    }
  }
}
