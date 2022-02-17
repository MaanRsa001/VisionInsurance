import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRequoteComponent } from './customer-requote.component';

describe('CustomerRequoteComponent', () => {
  let component: CustomerRequoteComponent;
  let fixture: ComponentFixture<CustomerRequoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerRequoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRequoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
