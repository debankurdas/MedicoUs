import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterBloodBankComponent } from './filter-blood-bank.component';

describe('FilterBloodBankComponent', () => {
  let component: FilterBloodBankComponent;
  let fixture: ComponentFixture<FilterBloodBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterBloodBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterBloodBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
