import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInformComponent } from './personal-inform.component';

describe('PersonalInformComponent', () => {
  let component: PersonalInformComponent;
  let fixture: ComponentFixture<PersonalInformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalInformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
