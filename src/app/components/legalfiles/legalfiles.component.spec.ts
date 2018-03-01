import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalfilesComponent } from './legalfiles.component';

describe('LegalfilesComponent', () => {
  let component: LegalfilesComponent;
  let fixture: ComponentFixture<LegalfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
