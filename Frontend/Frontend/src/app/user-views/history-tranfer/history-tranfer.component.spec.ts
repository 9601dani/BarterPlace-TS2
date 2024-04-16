import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTranferComponent } from './history-tranfer.component';

describe('HistoryTranferComponent', () => {
  let component: HistoryTranferComponent;
  let fixture: ComponentFixture<HistoryTranferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryTranferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryTranferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
