import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { CitasComponent } from './pages/citas.components';
import { AgendamientoCitasComponent } from './components/agendamiento-citas/agendamiento-citas.component';
import { AgendamientoConsultaCitasComponent } from './components/agendamiento-consulta-citas/agendamiento-consulta-citas.component';

@NgModule({
  declarations: [
      CitasComponent,
      AgendamientoCitasComponent,
      AgendamientoConsultaCitasComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
      CitasComponent
  ]
})
export class AgendamientoModule { }