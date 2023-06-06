import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettleAccountModalComponent } from './settle-account-modal.component';

describe('SettleAccountModalComponent', () => {
  let component: SettleAccountModalComponent;
  let fixture: ComponentFixture<SettleAccountModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettleAccountModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettleAccountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
