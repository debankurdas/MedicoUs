import { TestBed } from '@angular/core/testing';

import { CartListService } from './cart-list.service';

describe('CartListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartListService = TestBed.get(CartListService);
    expect(service).toBeTruthy();
  });
});
