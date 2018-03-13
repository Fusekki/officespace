import { TestBed, inject } from '@angular/core/testing';

import { MbPostService } from './mb-post.service';

describe('MbPostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MbPostService]
    });
  });

  it('should be created', inject([MbPostService], (service: MbPostService) => {
    expect(service).toBeTruthy();
  }));
});
