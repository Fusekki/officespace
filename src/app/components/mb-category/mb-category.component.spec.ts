import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MbCategoryComponent } from './mb-category.component';

describe('MbCategoryComponent', () => {
  let component: MbCategoryComponent;
  let fixture: ComponentFixture<MbCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MbCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MbCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
