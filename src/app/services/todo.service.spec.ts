import { TestBed, inject } from '@angular/core/testing';

import { ToDoService } from './todo.service';

describe('ToDoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToDoService]
    });
  });

  it('should be created', inject([ToDoService], (service: ToDoService) => {
    expect(service).toBeTruthy();
  }));
});
