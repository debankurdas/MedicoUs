import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSubmmitionComponent } from './email-submmition.component';

describe('EmailSubmmitionComponent', () => {
  let component: EmailSubmmitionComponent;
  let fixture: ComponentFixture<EmailSubmmitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailSubmmitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailSubmmitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
