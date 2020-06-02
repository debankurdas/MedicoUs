import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodBankAdminComponent } from './blood-bank-admin.component';

describe('BloodBankAdminComponent', () => {
  let component: BloodBankAdminComponent;
  let fixture: ComponentFixture<BloodBankAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodBankAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodBankAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
