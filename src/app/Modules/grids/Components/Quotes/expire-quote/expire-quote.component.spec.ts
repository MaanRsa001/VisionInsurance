import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpireQuoteComponent } from './expire-quote.component';

describe('ExpireQuoteComponent', () => {
  let component: ExpireQuoteComponent;
  let fixture: ComponentFixture<ExpireQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpireQuoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpireQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
