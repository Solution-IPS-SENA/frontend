import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamientoConsultaCitasComponent } from './agendamiento-consulta-citas.component';

describe('AgendamientoConsultaCitasComponent', () => {
  let component: AgendamientoConsultaCitasComponent;
  let fixture: ComponentFixture<AgendamientoConsultaCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendamientoConsultaCitasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendamientoConsultaCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
