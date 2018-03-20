import { TestBed, inject } from '@angular/core/testing';

import { MbCategoryService } from './mb-category.service';

describe('MbCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MbCategoryService]
    });
  });

  it('should be created', inject([MbCategoryService], (service: MbCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
