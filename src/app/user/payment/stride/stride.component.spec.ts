import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrideComponent } from './stride.component';

describe('StrideComponent', () => {
  let component: StrideComponent;
  let fixture: ComponentFixture<StrideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
