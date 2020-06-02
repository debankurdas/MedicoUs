import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodGroupAddComponent } from './blood-group-add.component';

describe('BloodGroupAddComponent', () => {
  let component: BloodGroupAddComponent;
  let fixture: ComponentFixture<BloodGroupAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodGroupAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodGroupAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
