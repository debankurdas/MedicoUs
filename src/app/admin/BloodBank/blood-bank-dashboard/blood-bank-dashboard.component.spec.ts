import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodBankDashboardComponent } from './blood-bank-dashboard.component';

describe('BloodBankDashboardComponent', () => {
  let component: BloodBankDashboardComponent;
  let fixture: ComponentFixture<BloodBankDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodBankDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodBankDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
