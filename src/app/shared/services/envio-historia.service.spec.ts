import { TestBed } from '@angular/core/testing';

import { EnvioHistoriaService } from './envio-historia.service';

describe('EnvioHistoriaService', () => {
  let service: EnvioHistoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvioHistoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
