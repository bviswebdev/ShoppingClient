import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductaddComponent } from './admin-productadd.component';

describe('AdminProductaddComponent', () => {
  let component: AdminProductaddComponent;
  let fixture: ComponentFixture<AdminProductaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
