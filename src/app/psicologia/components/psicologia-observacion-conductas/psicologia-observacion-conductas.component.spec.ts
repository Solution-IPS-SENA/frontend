import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsicologiaObservacionConductasComponent } from './psicologia-observacion-conductas.component';

describe('PsicologiaObservacionConductasComponent', () => {
  let component: PsicologiaObservacionConductasComponent;
  let fixture: ComponentFixture<PsicologiaObservacionConductasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsicologiaObservacionConductasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsicologiaObservacionConductasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
