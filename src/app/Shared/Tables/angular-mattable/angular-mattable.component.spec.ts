import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularMattableComponent } from './angular-mattable.component';

describe('AngularMattableComponent', () => {
  let component: AngularMattableComponent;
  let fixture: ComponentFixture<AngularMattableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularMattableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularMattableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
