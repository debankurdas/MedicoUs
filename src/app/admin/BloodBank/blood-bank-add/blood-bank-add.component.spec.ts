import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodBankAddComponent } from './blood-bank-add.component';

describe('BloodBankAddComponent', () => {
  let component: BloodBankAddComponent;
  let fixture: ComponentFixture<BloodBankAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodBankAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodBankAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
