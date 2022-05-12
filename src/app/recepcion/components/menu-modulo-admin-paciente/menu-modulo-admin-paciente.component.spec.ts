import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuModuloAdminPacienteComponent } from './menu-modulo-admin-paciente.component';

describe('MenuModuloAdminPacienteComponent', () => {
  let component: MenuModuloAdminPacienteComponent;
  let fixture: ComponentFixture<MenuModuloAdminPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuModuloAdminPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuModuloAdminPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
