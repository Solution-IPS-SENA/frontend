import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuModuloRecepcionComponent } from './menu-modulo-recepcion.component';

describe('MenuModuloRecepcionComponent', () => {
  let component: MenuModuloRecepcionComponent;
  let fixture: ComponentFixture<MenuModuloRecepcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuModuloRecepcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuModuloRecepcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
