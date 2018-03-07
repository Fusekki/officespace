import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatercoolerInputComponent } from './watercooler-input.component';

describe('WatercoolerInputComponent', () => {
  let component: WatercoolerInputComponent;
  let fixture: ComponentFixture<WatercoolerInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatercoolerInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatercoolerInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
