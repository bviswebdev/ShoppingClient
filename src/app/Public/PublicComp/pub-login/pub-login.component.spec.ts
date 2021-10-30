import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubLoginComponent } from './pub-login.component';

describe('PubLoginComponent', () => {
  let component: PubLoginComponent;
  let fixture: ComponentFixture<PubLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PubLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PubLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
