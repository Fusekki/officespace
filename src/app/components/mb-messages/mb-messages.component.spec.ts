import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MbMessagesComponent } from './mb-messages.component';

describe('MbMessagesComponent', () => {
  let component: MbMessagesComponent;
  let fixture: ComponentFixture<MbMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MbMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MbMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
