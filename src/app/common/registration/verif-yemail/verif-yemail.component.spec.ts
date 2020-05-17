import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifYEmailComponent } from './verif-yemail.component';

describe('VerifYEmailComponent', () => {
  let component: VerifYEmailComponent;
  let fixture: ComponentFixture<VerifYEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifYEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifYEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
