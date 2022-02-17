import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistQuoteWqComponent } from './exist-quote-wq.component';

describe('ExistQuoteWqComponent', () => {
  let component: ExistQuoteWqComponent;
  let fixture: ComponentFixture<ExistQuoteWqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistQuoteWqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistQuoteWqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
