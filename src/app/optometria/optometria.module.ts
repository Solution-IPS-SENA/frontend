import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { OptometriaAntecedentesPersonalesComponent } from './components/optometria-antecedentes-personales/optometria-antecedentes-personales.component';
import { OptometriaAntecedentesOcupacionalesComponent } from './components/optometria-antecedentes-ocupacionales/optometria-antecedentes-ocupacionales.component';
import { OptometriaComponent } from './pages/optometria.component';
import { OptometriaSintomasComponent } from './components/optometria-sintomas/optometria-sintomas.component';
import { OptometriaAgudezaVisualComponent } from './components/optometria-agudeza-visual/optometria-agudeza-visual.component';
import { OptometriaHallazgosComponent } from './components/optometria-hallazgos/optometria-hallazgos.component';

@NgModule({
  declarations: [
    OptometriaAntecedentesPersonalesComponent,
    OptometriaAntecedentesOcupacionalesComponent,
    OptometriaComponent,
    OptometriaSintomasComponent,
    OptometriaAgudezaVisualComponent,
    OptometriaHallazgosComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ], 
  exports:[
    OptometriaComponent
  ]
})
export class OptometriaModule { }
