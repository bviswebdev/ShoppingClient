import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppXsnavComponent } from './app-xsnav.component';

describe('AppXsnavComponent', () => {
  let component: AppXsnavComponent;
  let fixture: ComponentFixture<AppXsnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppXsnavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppXsnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
