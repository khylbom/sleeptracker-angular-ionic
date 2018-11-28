import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepinessPickerComponent } from './sleepiness-picker.component';

describe('SleepinessPickerComponent', () => {
  let component: SleepinessPickerComponent;
  let fixture: ComponentFixture<SleepinessPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SleepinessPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SleepinessPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
