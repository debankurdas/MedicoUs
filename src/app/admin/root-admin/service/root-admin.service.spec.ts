import { TestBed } from '@angular/core/testing';

import { RootAdminService } from './root-admin.service';

describe('RootAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RootAdminService = TestBed.get(RootAdminService);
    expect(service).toBeTruthy();
  });
});
