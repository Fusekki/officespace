import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalcaseDetailComponent } from './legalcase-detail.component';

describe('LegalcaseDetailComponent', () => {
  let component: LegalcaseDetailComponent;
  let fixture: ComponentFixture<LegalcaseDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalcaseDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalcaseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
