import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosEPage } from './gastos-e.page';

describe('GastosEPage', () => {
  let component: GastosEPage;
  let fixture: ComponentFixture<GastosEPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastosEPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastosEPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
