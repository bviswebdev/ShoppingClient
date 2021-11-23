import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/GlobalService/auth.service';
import { PdbrandasyncValidator } from '../../Service/pdbrandasync-validator.service';
import { Productasyncvalidators } from '../../Service/productasyncvalidators';
import { ProductDataService } from '../../Service/productservice.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
  providers: [
    { provide: Productasyncvalidators, useClass: Productasyncvalidators },
  ],
})
export class ProductAddComponent implements OnInit {
  formProductAdd!: FormGroup;
  public formSubmitAttempt!: boolean;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private pdbrndValidator: PdbrandasyncValidator,
    private productDataService: ProductDataService
  ) {}

  ngOnInit(): void {
    this.pdbrndValidator.productService = this.productDataService;
    this.formProductAdd = this.fb.group(
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
        fileupload: [''],
        category: [''],
      },
      {
        validators: null,
        asyncValidators: Productasyncvalidators.createProductBrandValidator(
          this.productDataService
        ),

        updateOn: 'blur',
      }
    );
  }

  get productname() {
    return this.formProductAdd.get('productname');
  }

  get brandname() {
    return this.formProductAdd.get('brandname');
  }

  get description() {
    return this.formProductAdd.get('description');
  }

  get unitprice() {
    return this.formProductAdd.get('unitprice');
  }

  get quantity() {
    return this.formProductAdd.get('quantity');
  }

  get category() {
    return this.formProductAdd.get('category');
  }

  get fileupload() {
    return this.formProductAdd.get('fileupload');
  }

  async onProductAddFormSubmit() {
    this.formSubmitAttempt = true;
    console.log(this.formProductAdd);

    // stop here if form is invalid
    if (this.formProductAdd.invalid) {
      return;
    }

    try {
      console.log(this.formProductAdd);

      //this.router.navigate(['/medicare']);

      // await this.authService.login(username, password);
    } catch (err) {
      console.log(err);
    }
  }
}
