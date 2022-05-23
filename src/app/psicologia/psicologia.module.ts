import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { PsicologiaAccidentesEnfermedadesComponent } from './components/psicologia-accidentes-enfermedades/psicologia-accidentes-enfermedades.component';
import { PsicologiaObservacionConductasComponent } from './components/psicologia-observacion-conductas/psicologia-observacion-conductas.component';
import { PsicologiaEmpresaComponent } from './components/psicologia-empresa/psicologia-empresa.component';
import { PsicologiaComponent } from './pages/psicologia.component';

@NgModule({
  declarations: [
    PsicologiaAccidentesEnfermedadesComponent,
    PsicologiaObservacionConductasComponent,
    PsicologiaEmpresaComponent,
    PsicologiaComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    PsicologiaComponent
  ]
})
export class PsicologiaModule { }
