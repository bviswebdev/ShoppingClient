import { TestBed } from '@angular/core/testing';

import { MedicareappService } from './medicareapp.service';

describe('MedicareappService', () => {
  let service: MedicareappService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicareappService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
