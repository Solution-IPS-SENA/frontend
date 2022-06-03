import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsicologiaCierreHistoriaClinicaComponent } from './psicologia-cierre-historia-clinica.component';

describe('PsicologiaCierreHistoriaClinicaComponent', () => {
  let component: PsicologiaCierreHistoriaClinicaComponent;
  let fixture: ComponentFixture<PsicologiaCierreHistoriaClinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsicologiaCierreHistoriaClinicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsicologiaCierreHistoriaClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
