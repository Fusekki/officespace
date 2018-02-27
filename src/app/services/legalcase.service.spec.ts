import { TestBed, inject } from '@angular/core/testing';

import { LegalcaseService } from './legalcase.service';

describe('LegalcaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LegalcaseService]
    });
  });

  it('should be created', inject([LegalcaseService], (service: LegalcaseService) => {
    expect(service).toBeTruthy();
  }));
});
