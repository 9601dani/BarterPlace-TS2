import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatFrontendComponent } from './chat-frontend.component';

describe('ChatFrontendComponent', () => {
  let component: ChatFrontendComponent;
  let fixture: ComponentFixture<ChatFrontendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatFrontendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatFrontendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
