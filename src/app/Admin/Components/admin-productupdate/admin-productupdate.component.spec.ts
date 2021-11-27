import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductupdateComponent } from './admin-productupdate.component';

describe('AdminProductupdateComponent', () => {
  let component: AdminProductupdateComponent;
  let fixture: ComponentFixture<AdminProductupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductupdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
