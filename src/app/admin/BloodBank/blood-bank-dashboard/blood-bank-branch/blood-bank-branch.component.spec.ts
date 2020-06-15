import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodBankBranchComponent } from './blood-bank-branch.component';

describe('BloodBankBranchComponent', () => {
  let component: BloodBankBranchComponent;
  let fixture: ComponentFixture<BloodBankBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodBankBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodBankBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
