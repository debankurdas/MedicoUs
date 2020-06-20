import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarHospComponent } from './navbar-hosp.component';

describe('NavbarHospComponent', () => {
  let component: NavbarHospComponent;
  let fixture: ComponentFixture<NavbarHospComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarHospComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarHospComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
