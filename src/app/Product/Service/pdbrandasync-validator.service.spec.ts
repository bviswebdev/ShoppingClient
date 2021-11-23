import { TestBed } from '@angular/core/testing';

import { PdbrandasyncValidatorService } from './pdbrandasync-validator.service';

describe('PdbrandasyncValidatorService', () => {
  let service: PdbrandasyncValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdbrandasyncValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
