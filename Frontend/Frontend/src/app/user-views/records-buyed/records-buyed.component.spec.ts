import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsBuyedComponent } from './records-buyed.component';

describe('RecordsBuyedComponent', () => {
  let component: RecordsBuyedComponent;
  let fixture: ComponentFixture<RecordsBuyedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordsBuyedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordsBuyedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
