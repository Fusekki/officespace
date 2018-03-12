import { TestBed, inject } from '@angular/core/testing';

import { MessageBoardService } from './message-board.service';

describe('MessageBoardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageBoardService]
    });
  });

  it('should be created', inject([MessageBoardService], (service: MessageBoardService) => {
    expect(service).toBeTruthy();
  }));
});
