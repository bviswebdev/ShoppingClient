import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddressCheckoutComponent } from './user-address-checkout.component';

describe('UserAddressCheckoutComponent', () => {
  let component: UserAddressCheckoutComponent;
  let fixture: ComponentFixture<UserAddressCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAddressCheckoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddressCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
