import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalcaseFilesComponent } from './legalcase-files.component';

describe('LegalcaseFilesComponent', () => {
  let component: LegalcaseFilesComponent;
  let fixture: ComponentFixture<LegalcaseFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalcaseFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalcaseFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
