import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificacionesAptitudOcupacionalComponent } from './certificaciones-aptitud-ocupacional.component';

describe('CertificacionesAptitudOcupacionalComponent', () => {
  let component: CertificacionesAptitudOcupacionalComponent;
  let fixture: ComponentFixture<CertificacionesAptitudOcupacionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificacionesAptitudOcupacionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificacionesAptitudOcupacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
