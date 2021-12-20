import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSnackComponent } from './user-snack.component';

describe('UserSnackComponent', () => {
  let component: UserSnackComponent;
  let fixture: ComponentFixture<UserSnackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSnackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSnackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
