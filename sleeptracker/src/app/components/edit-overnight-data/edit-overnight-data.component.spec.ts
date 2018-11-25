import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOvernightDataComponent } from './edit-overnight-data.component';

describe('EditOvernightDataComponent', () => {
  let component: EditOvernightDataComponent;
  let fixture: ComponentFixture<EditOvernightDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOvernightDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOvernightDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
