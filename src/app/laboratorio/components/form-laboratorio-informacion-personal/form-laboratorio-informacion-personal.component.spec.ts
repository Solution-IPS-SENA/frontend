import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLaboratorioInformacionPersonalComponent } from './form-laboratorio-informacion-personal.component';

describe('FormLaboratorioInformacionPersonalComponent', () => {
  let component: FormLaboratorioInformacionPersonalComponent;
  let fixture: ComponentFixture<FormLaboratorioInformacionPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormLaboratorioInformacionPersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLaboratorioInformacionPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
