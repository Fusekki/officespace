import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MbMessageInputComponent } from './mb-message-input.component';

describe('MbMessageInputComponent', () => {
  let component: MbMessageInputComponent;
  let fixture: ComponentFixture<MbMessageInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MbMessageInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MbMessageInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
