import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MbMessageEditComponent } from './mb-message-edit.component';

describe('MbMessageEditComponent', () => {
  let component: MbMessageEditComponent;
  let fixture: ComponentFixture<MbMessageEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MbMessageEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MbMessageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
