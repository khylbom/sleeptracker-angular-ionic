import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepHistoryPage } from './sleep-history.page';

describe('SleepHistoryPage', () => {
  let component: SleepHistoryPage;
  let fixture: ComponentFixture<SleepHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SleepHistoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SleepHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
