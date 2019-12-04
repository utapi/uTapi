import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopAddressPage } from './shop-address.page';

describe('ShopAddressPage', () => {
  let component: ShopAddressPage;
  let fixture: ComponentFixture<ShopAddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopAddressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
