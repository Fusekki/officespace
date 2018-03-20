import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MbMessageDraftComponent } from './mb-message-draft.component';

describe('MbMessageDraftComponent', () => {
  let component: MbMessageDraftComponent;
  let fixture: ComponentFixture<MbMessageDraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MbMessageDraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MbMessageDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
