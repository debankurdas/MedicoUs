import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalDisplayComponent } from './hospital-display.component';

describe('HospitalDisplayComponent', () => {
  let component: HospitalDisplayComponent;
  let fixture: ComponentFixture<HospitalDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
