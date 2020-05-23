import { TestBed } from '@angular/core/testing';

import { BedService } from './bed.service';

describe('BedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BedService = TestBed.get(BedService);
    expect(service).toBeTruthy();
  });
});
