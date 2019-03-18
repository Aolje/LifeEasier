import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresosEPage } from './ingresos-e.page';

describe('IngresosEPage', () => {
  let component: IngresosEPage;
  let fixture: ComponentFixture<IngresosEPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresosEPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresosEPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
