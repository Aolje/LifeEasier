import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresosPage } from './ingresos.page';

describe('IngresosPage', () => {
  let component: IngresosPage;
  let fixture: ComponentFixture<IngresosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
