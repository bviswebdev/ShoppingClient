import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubContactComponent } from './pub-contact.component';

describe('PubContactComponent', () => {
  let component: PubContactComponent;
  let fixture: ComponentFixture<PubContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PubContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PubContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
