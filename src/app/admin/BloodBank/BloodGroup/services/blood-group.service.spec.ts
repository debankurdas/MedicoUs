import { TestBed } from '@angular/core/testing';

import { BloodGroupService } from './blood-group.service';

describe('BloodGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BloodGroupService = TestBed.get(BloodGroupService);
    expect(service).toBeTruthy();
  });
});
