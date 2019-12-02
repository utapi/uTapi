import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCompletePage } from './order-complete.page';

describe('OrderCompletePage', () => {
  let component: OrderCompletePage;
  let fixture: ComponentFixture<OrderCompletePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCompletePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCompletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
