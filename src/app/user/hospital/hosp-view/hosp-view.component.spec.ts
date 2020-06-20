import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospViewComponent } from './hosp-view.component';

describe('HospViewComponent', () => {
  let component: HospViewComponent;
  let fixture: ComponentFixture<HospViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
