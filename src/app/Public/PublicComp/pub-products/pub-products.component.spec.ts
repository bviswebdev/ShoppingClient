import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubProductsComponent } from './pub-products.component';

describe('PubProductsComponent', () => {
  let component: PubProductsComponent;
  let fixture: ComponentFixture<PubProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PubProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PubProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
