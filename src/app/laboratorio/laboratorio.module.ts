import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { LaboratorioComponent } from './pages/laboratorio.component';
import { LaboratorioExamenesComponent } from './components/laboratorio-examenes/laboratorio-examenes.component';
import { LaboratorioExamenes2Component } from './components/laboratorio-examenes2/laboratorio-examenes2.component';
import { LaboratorioRoutingModule } from './laboratorio-routing.module';
import { NavbarConfiguracionRutasService } from '../shared/services/navbar-configuracion-rutas.service';

@NgModule({
  declarations: [
    LaboratorioComponent,
    LaboratorioExamenesComponent,
    LaboratorioExamenes2Component,
  ],
  imports: [
    CommonModule,
    SharedModule,
    LaboratorioRoutingModule
  ],
  exports:[
    LaboratorioComponent
  ]
})
export class LaboratorioModule {
  constructor(navBar: NavbarConfiguracionRutasService) {
    navBar.definirRutaDatosPaciente('/historias/laboratorio');
    navBar.definirRutaHistoriaClinica('/historias/laboratorio/1');
  }
 }
