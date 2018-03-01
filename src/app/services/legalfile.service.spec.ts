import { TestBed, inject } from '@angular/core/testing';

import { LegalfileService } from './legalfile.service';

describe('LegalfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LegalfileService]
    });
  });

  it('should be created', inject([LegalfileService], (service: LegalfileService) => {
    expect(service).toBeTruthy();
  }));
});
