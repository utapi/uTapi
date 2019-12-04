import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHelpPage } from './app-help.page';

describe('AppHelpPage', () => {
  let component: AppHelpPage;
  let fixture: ComponentFixture<AppHelpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppHelpPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppHelpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
