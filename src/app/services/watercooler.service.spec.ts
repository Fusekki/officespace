import { TestBed, inject } from '@angular/core/testing';

import { WatercoolerService } from './watercooler.service';

describe('WatercoolerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WatercoolerService]
    });
  });

  it('should be created', inject([WatercoolerService], (service: WatercoolerService) => {
    expect(service).toBeTruthy();
  }));
});
