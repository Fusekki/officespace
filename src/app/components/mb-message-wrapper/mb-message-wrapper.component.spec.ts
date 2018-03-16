import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MbMessageWrapperComponent } from './mb-message-wrapper.component';

describe('MbMessageWrapperComponent', () => {
  let component: MbMessageWrapperComponent;
  let fixture: ComponentFixture<MbMessageWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MbMessageWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MbMessageWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
