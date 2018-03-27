import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MbMessageSubscribersComponent } from './mb-message-subscribers.component';

describe('MbMessageSubscribersComponent', () => {
  let component: MbMessageSubscribersComponent;
  let fixture: ComponentFixture<MbMessageSubscribersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MbMessageSubscribersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MbMessageSubscribersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
