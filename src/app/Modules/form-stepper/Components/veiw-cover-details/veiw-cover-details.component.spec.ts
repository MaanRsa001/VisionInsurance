import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiwCoverDetailsComponent } from './veiw-cover-details.component';

describe('VeiwCoverDetailsComponent', () => {
  let component: VeiwCoverDetailsComponent;
  let fixture: ComponentFixture<VeiwCoverDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeiwCoverDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VeiwCoverDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
