import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { CitasComponent } from './pages/citas.components';
import { AgendamientoCitasComponent } from './components/agendamiento-citas/agendamiento-citas.component';
import { AgendamientoConsultaCitasComponent } from './components/agendamiento-consulta-citas/agendamiento-consulta-citas.component';
import { AgendamientoRoutingModule } from './agendamiento-routing.module';
import { NavbarConfiguracionRutasService } from '../shared/services/navbar-configuracion-rutas.service';

@NgModule({
  declarations: [
      CitasComponent,
      AgendamientoCitasComponent,
      AgendamientoConsultaCitasComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AgendamientoRoutingModule
  ],
  exports: [
      CitasComponent
  ]
})
export class AgendamientoModule {
  constructor(navBar: NavbarConfiguracionRutasService) {
    navBar.definirRutaDatosPaciente('/historias/agendamiento');
    navBar.definirRutaHistoriaClinica('/historias/agendamiento/1');
  }
}
