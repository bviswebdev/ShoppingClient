import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubRegisterComponent } from './pub-register.component';

describe('PubRegisterComponent', () => {
  let component: PubRegisterComponent;
  let fixture: ComponentFixture<PubRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PubRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PubRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
