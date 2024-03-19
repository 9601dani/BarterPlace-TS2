import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPublishComponent } from './request-publish.component';

describe('RequestPublishComponent', () => {
  let component: RequestPublishComponent;
  let fixture: ComponentFixture<RequestPublishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestPublishComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestPublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
