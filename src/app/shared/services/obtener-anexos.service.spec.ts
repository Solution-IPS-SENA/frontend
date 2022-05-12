import { TestBed } from '@angular/core/testing';

import { ObtenerAnexosService } from './obtener-anexos.service';

describe('ObtenerAnexosService', () => {
  let service: ObtenerAnexosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObtenerAnexosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
