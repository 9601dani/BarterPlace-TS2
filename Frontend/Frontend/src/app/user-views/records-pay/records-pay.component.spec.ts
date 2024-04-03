import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsPayComponent } from './records-pay.component';

describe('RecordsPayComponent', () => {
  let component: RecordsPayComponent;
  let fixture: ComponentFixture<RecordsPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordsPayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordsPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
