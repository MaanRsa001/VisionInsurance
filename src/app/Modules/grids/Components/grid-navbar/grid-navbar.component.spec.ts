import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridNavbarComponent } from './grid-navbar.component';

describe('GridNavbarComponent', () => {
  let component: GridNavbarComponent;
  let fixture: ComponentFixture<GridNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
