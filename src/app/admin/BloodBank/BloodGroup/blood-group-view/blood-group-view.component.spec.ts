import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodGroupViewComponent } from './blood-group-view.component';

describe('BloodGroupViewComponent', () => {
  let component: BloodGroupViewComponent;
  let fixture: ComponentFixture<BloodGroupViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodGroupViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodGroupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
