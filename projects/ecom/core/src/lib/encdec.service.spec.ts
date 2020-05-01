import { TestBed } from '@angular/core/testing';

import { EncdecService } from './encdec.service';

describe('EncdecService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EncdecService = TestBed.get(EncdecService);
    expect(service).toBeTruthy();
  });
});
