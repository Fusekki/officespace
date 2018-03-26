import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MbMessageThreadComponent } from './mb-message-thread.component';

describe('MbMessageThreadComponent', () => {
  let component: MbMessageThreadComponent;
  let fixture: ComponentFixture<MbMessageThreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MbMessageThreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MbMessageThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
