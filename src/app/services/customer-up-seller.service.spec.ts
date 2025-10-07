import { TestBed } from '@angular/core/testing';

import { CustomerUpSellerService } from './customer-up-seller.service';

describe('CustomerUpSellerService', () => {
  let service: CustomerUpSellerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerUpSellerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
