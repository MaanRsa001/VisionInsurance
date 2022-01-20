import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleInformComponent } from './vehicle-inform.component';

describe('VehicleInformComponent', () => {
  let component: VehicleInformComponent;
  let fixture: ComponentFixture<VehicleInformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleInformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleInformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
