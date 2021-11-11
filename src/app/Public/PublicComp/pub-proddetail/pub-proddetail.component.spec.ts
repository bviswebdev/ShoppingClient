import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubProddetailComponent } from './pub-proddetail.component';

describe('PubProddetailComponent', () => {
  let component: PubProddetailComponent;
  let fixture: ComponentFixture<PubProddetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PubProddetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PubProddetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
