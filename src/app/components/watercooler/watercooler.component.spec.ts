import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatercoolerComponent } from './watercooler.component';

describe('WatercoolerComponent', () => {
  let component: WatercoolerComponent;
  let fixture: ComponentFixture<WatercoolerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatercoolerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatercoolerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
