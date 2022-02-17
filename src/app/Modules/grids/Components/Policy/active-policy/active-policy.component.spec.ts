import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePolicyComponent } from './active-policy.component';

describe('ActivePolicyComponent', () => {
  let component: ActivePolicyComponent;
  let fixture: ComponentFixture<ActivePolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivePolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
