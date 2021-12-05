import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderconfirmComponent } from './customer-orderconfirm.component';

describe('CustomerOrderconfirmComponent', () => {
  let component: CustomerOrderconfirmComponent;
  let fixture: ComponentFixture<CustomerOrderconfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerOrderconfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrderconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
