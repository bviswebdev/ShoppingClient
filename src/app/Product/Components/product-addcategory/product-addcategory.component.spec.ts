import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddcategoryComponent } from './product-addcategory.component';

describe('ProductAddcategoryComponent', () => {
  let component: ProductAddcategoryComponent;
  let fixture: ComponentFixture<ProductAddcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductAddcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAddcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
