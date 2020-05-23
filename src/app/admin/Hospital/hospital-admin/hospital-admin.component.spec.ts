import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalAdminComponent } from './hospital-admin.component';

describe('HospitalAdminComponent', () => {
  let component: HospitalAdminComponent;
  let fixture: ComponentFixture<HospitalAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
