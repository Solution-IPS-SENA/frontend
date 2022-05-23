import { TestBed } from '@angular/core/testing';

import { NavbarConfiguracionRutasService } from './navbar-configuracion-rutas.service';

describe('NavbarConfiguracionRutasService', () => {
  let service: NavbarConfiguracionRutasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarConfiguracionRutasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
