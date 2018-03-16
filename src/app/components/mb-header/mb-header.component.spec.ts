import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MbHeaderComponent } from './mb-header.component';

describe('MbHeaderComponent', () => {
  let component: MbHeaderComponent;
  let fixture: ComponentFixture<MbHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MbHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MbHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
