import { TestBed } from '@angular/core/testing';

import { BloodBankService } from './blood-bank.service';

describe('BloodBankService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BloodBankService = TestBed.get(BloodBankService);
    expect(service).toBeTruthy();
  });
});
