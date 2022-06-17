import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { PsicologiaAccidentesEnfermedadesComponent } from './components/psicologia-accidentes-enfermedades/psicologia-accidentes-enfermedades.component';
import { PsicologiaObservacionConductasComponent } from './components/psicologia-observacion-conductas/psicologia-observacion-conductas.component';
import { PsicologiaEmpresaComponent } from './components/psicologia-empresa/psicologia-empresa.component';
import { PsicologiaComponent } from './pages/psicologia.component';
import { PsicologiaRoutingModule } from './psicologia-routing.module';
import { NavbarConfiguracionRutasService } from '../shared/services/navbar-configuracion-rutas.service';
import { PsicologiaCierreHistoriaClinicaComponent } from './components/psicologia-cierre-historia-clinica/psicologia-cierre-historia-clinica.component';

@NgModule({
  declarations: [
    PsicologiaAccidentesEnfermedadesComponent,
    PsicologiaObservacionConductasComponent,
    PsicologiaEmpresaComponent,
    PsicologiaComponent,
    PsicologiaCierreHistoriaClinicaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PsicologiaRoutingModule
  ],
  exports:[
    PsicologiaComponent
  ]
})
export class PsicologiaModule {
  constructor(navBar: NavbarConfiguracionRutasService) {
    navBar.definirRutaDatosPaciente('/historias/psicologia');
    navBar.definirRutaHistoriaClinica('/historias/psicologia/1');
  }
}
