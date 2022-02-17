import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingReferalComponent } from './pending-referal.component';

describe('PendingReferalComponent', () => {
  let component: PendingReferalComponent;
  let fixture: ComponentFixture<PendingReferalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingReferalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingReferalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
