import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubAboutComponent } from './pub-about.component';

describe('PubAboutComponent', () => {
  let component: PubAboutComponent;
  let fixture: ComponentFixture<PubAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PubAboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PubAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
