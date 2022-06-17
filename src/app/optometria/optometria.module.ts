import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { OptometriaAntecedentesPersonalesComponent } from './components/optometria-antecedentes-personales/optometria-antecedentes-personales.component';
import { OptometriaAntecedentesOcupacionalesComponent } from './components/optometria-antecedentes-ocupacionales/optometria-antecedentes-ocupacionales.component';
import { OptometriaComponent } from './pages/optometria.component';
import { OptometriaSintomasComponent } from './components/optometria-sintomas/optometria-sintomas.component';
import { OptometriaAgudezaVisualComponent } from './components/optometria-agudeza-visual/optometria-agudeza-visual.component';
import { OptometriaHallazgosComponent } from './components/optometria-hallazgos/optometria-hallazgos.component';
import { OptometriaRoutingModule } from './optometria-routing.module';
import { NavbarConfiguracionRutasService } from '../shared/services/navbar-configuracion-rutas.service';
import { OptometriaCierreHistoriaClinicaComponent } from './components/optometria-cierre-historia-clinica/optometria-cierre-historia-clinica.component';

@NgModule({
  declarations: [
    OptometriaAntecedentesPersonalesComponent,
    OptometriaAntecedentesOcupacionalesComponent,
    OptometriaComponent,
    OptometriaSintomasComponent,
    OptometriaAgudezaVisualComponent,
    OptometriaHallazgosComponent,
    OptometriaCierreHistoriaClinicaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OptometriaRoutingModule
  ], 
  exports:[
    OptometriaComponent
  ]
})
export class OptometriaModule {
  constructor(navBar: NavbarConfiguracionRutasService) {
    navBar.definirRutaDatosPaciente('/historias/optometria');
    navBar.definirRutaHistoriaClinica('/historias/optometria/1');
  }
}
