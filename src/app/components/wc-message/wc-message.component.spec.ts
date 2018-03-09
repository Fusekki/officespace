import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WcmessageComponent } from './wc-message.component';

describe('WcmessageComponent', () => {
  let component: WcmessageComponent;
  let fixture: ComponentFixture<WcmessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WcmessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WcmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
