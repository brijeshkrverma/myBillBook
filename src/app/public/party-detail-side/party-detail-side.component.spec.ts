import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyDetailSideComponent } from './party-detail-side.component';

describe('PartyDetailSideComponent', () => {
  let component: PartyDetailSideComponent;
  let fixture: ComponentFixture<PartyDetailSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartyDetailSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyDetailSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
