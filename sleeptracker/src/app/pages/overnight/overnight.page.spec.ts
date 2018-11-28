import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvernightPage } from './overnight.page';

describe('OvernightPage', () => {
  let component: OvernightPage;
  let fixture: ComponentFixture<OvernightPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvernightPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvernightPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
