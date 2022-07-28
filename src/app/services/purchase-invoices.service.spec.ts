import { TestBed } from '@angular/core/testing';

import { PurchaseInvoicesService } from './purchase-invoices.service';

describe('PurchaseInvoicesService', () => {
  let service: PurchaseInvoicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseInvoicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
