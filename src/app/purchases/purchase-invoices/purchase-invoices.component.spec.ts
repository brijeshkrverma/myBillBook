import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseInvoicesComponent } from './purchase-invoices.component';

describe('PurchaseInvoicesComponent', () => {
  let component: PurchaseInvoicesComponent;
  let fixture: ComponentFixture<PurchaseInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseInvoicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
