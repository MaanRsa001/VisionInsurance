import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedReferalComponent } from './approved-referal.component';

describe('ApprovedReferalComponent', () => {
  let component: ApprovedReferalComponent;
  let fixture: ComponentFixture<ApprovedReferalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedReferalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedReferalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
