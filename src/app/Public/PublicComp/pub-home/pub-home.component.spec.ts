import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubHomeComponent } from './pub-home.component';

describe('PubHomeComponent', () => {
  let component: PubHomeComponent;
  let fixture: ComponentFixture<PubHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PubHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PubHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
