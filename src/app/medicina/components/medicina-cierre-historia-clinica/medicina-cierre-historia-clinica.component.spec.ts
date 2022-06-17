import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinaCierreHistoriaClinicaComponent } from './medicina-cierre-historia-clinica.component';

describe('MedicinaCierreHistoriaClinicaComponent', () => {
  let component: MedicinaCierreHistoriaClinicaComponent;
  let fixture: ComponentFixture<MedicinaCierreHistoriaClinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicinaCierreHistoriaClinicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicinaCierreHistoriaClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
