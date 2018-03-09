import { TestBed, inject } from '@angular/core/testing';

import { WcmessageService } from './wc-message.service';

describe('WcmessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WcmessageService]
    });
  });

  it('should be created', inject([WcmessageService], (service: WcmessageService) => {
    expect(service).toBeTruthy();
  }));
});
