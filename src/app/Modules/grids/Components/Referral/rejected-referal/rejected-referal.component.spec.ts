import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedReferalComponent } from './rejected-referal.component';

describe('RejectedReferalComponent', () => {
  let component: RejectedReferalComponent;
  let fixture: ComponentFixture<RejectedReferalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedReferalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedReferalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
