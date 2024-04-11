import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPublishComponent } from './report-publish.component';

describe('ReportPublishComponent', () => {
  let component: ReportPublishComponent;
  let fixture: ComponentFixture<ReportPublishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportPublishComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportPublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
