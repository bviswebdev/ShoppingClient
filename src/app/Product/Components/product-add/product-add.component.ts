import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/GlobalService/auth.service';
import { PdbrandasyncValidator } from '../../Service/pdbrandasync-validator.service';
import { Productasyncvalidators } from '../../Service/productasyncvalidators';
import { ProductDataService } from '../../Service/productservice.service';
import {
  fileFormatValidator,
  fileSizeValidator,
} from '../../Service/productsyncvalidators';

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
  public fileUploadAttempt!: boolean;
  fileName = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private pdbrndValidator: PdbrandasyncValidator,
    private productDataService: ProductDataService
  ) {}

  ngOnInit(): void {
    console.log(`form submit attempt ${this.formSubmitAttempt}`);
    this.pdbrndValidator.productService = this.productDataService;
    this.formProductAdd = this.fb.group(
      {
        productname: ['test', [Validators.required, Validators.maxLength(30)]],
        brandname: ['test', [Validators.required, Validators.maxLength(30)]],
        description: [
          'testtesttesttest',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(50),
          ],
        ],
        unitprice: [
          '0.00',
          [
            Validators.required,
            //Validators.pattern(/^[0-9]+\.[0-9]{2}$/),
            Validators.pattern('^([0-9]+|[0-9]+.[0-9]{1,2})$'),
          ],
        ],
        quantity: ['0', [Validators.required, Validators.pattern('^[0-9]+$')]],
        filesource: [
          '',
          [Validators.required, fileFormatValidator, fileSizeValidator],
        ],
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

  onFileSelected(event: any) {
    console.log('iam selected');
    const file: File = event.target.files[0];
    if (file) {
      console.log(file);
      this.fileName = file.name;
      this.formProductAdd.patchValue({
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

  get filesource() {
    return this.formProductAdd.get('filesource');
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
