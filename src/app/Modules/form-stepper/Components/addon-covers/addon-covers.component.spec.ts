import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddonCoversComponent } from './addon-covers.component';

describe('AddonCoversComponent', () => {
  let component: AddonCoversComponent;
  let fixture: ComponentFixture<AddonCoversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddonCoversComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddonCoversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
