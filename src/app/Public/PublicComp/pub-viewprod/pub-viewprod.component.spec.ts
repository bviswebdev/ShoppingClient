import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubViewprodComponent } from './pub-viewprod.component';

describe('PubViewprodComponent', () => {
  let component: PubViewprodComponent;
  let fixture: ComponentFixture<PubViewprodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PubViewprodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PubViewprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
