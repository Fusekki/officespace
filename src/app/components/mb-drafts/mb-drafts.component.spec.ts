import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MbDraftsComponent } from './mb-drafts.component';

describe('MbDraftsComponent', () => {
  let component: MbDraftsComponent;
  let fixture: ComponentFixture<MbDraftsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MbDraftsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MbDraftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
