import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomertestComponent } from './customertest.component';

describe('CustomertestComponent', () => {
  let component: CustomertestComponent;
  let fixture: ComponentFixture<CustomertestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomertestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomertestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
