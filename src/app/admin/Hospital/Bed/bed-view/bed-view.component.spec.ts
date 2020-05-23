import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BedViewComponent } from './bed-view.component';

describe('BedViewComponent', () => {
  let component: BedViewComponent;
  let fixture: ComponentFixture<BedViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BedViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
