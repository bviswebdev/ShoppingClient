import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMedicareComponent } from './app-medicare.component';

describe('AppMedicareComponent', () => {
  let component: AppMedicareComponent;
  let fixture: ComponentFixture<AppMedicareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppMedicareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppMedicareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
