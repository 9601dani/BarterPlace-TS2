import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageMoneyAddComponent } from './package-money-add.component';

describe('PackageMoneyAddComponent', () => {
  let component: PackageMoneyAddComponent;
  let fixture: ComponentFixture<PackageMoneyAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageMoneyAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageMoneyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
