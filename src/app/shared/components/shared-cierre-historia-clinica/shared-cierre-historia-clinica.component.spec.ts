import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedCierreHistoriaClinicaComponent } from './shared-cierre-historia-clinica.component';

describe('SharedCierreHistoriaClinicaComponent', () => {
  let component: SharedCierreHistoriaClinicaComponent;
  let fixture: ComponentFixture<SharedCierreHistoriaClinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedCierreHistoriaClinicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedCierreHistoriaClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
