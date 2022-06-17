import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptometriaCierreHistoriaClinicaComponent } from './optometria-cierre-historia-clinica.component';

describe('OptometriaCierreHistoriaClinicaComponent', () => {
  let component: OptometriaCierreHistoriaClinicaComponent;
  let fixture: ComponentFixture<OptometriaCierreHistoriaClinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptometriaCierreHistoriaClinicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptometriaCierreHistoriaClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
