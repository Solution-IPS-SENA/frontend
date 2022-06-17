import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratorioCierreHistoriaClinicaComponent } from './laboratorio-cierre-historia-clinica.component';

describe('LaboratorioCierreHistoriaClinicaComponent', () => {
  let component: LaboratorioCierreHistoriaClinicaComponent;
  let fixture: ComponentFixture<LaboratorioCierreHistoriaClinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratorioCierreHistoriaClinicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratorioCierreHistoriaClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
