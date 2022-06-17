import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinaInmunizacionesComponent } from './medicina-inmunizaciones.component';

describe('MedicinaInmunizacionesComponent', () => {
  let component: MedicinaInmunizacionesComponent;
  let fixture: ComponentFixture<MedicinaInmunizacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicinaInmunizacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicinaInmunizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});