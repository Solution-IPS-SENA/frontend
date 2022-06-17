import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsicologiaAccidentesEnfermedadesComponent } from './psicologia-accidentes-enfermedades.component';

describe('PsicologiaAccidentesEnfermedadesComponent', () => {
  let component: PsicologiaAccidentesEnfermedadesComponent;
  let fixture: ComponentFixture<PsicologiaAccidentesEnfermedadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsicologiaAccidentesEnfermedadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsicologiaAccidentesEnfermedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
