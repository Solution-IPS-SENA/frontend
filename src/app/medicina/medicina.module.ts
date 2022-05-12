import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { MedicinaComponent } from './pages/medicina.component';
import { MedicinaAntecedentesComponent } from './components/medicina-antecedentes/medicina-antecedentes.component';
import { MedicinaAntecedentes2Component } from './components/medicina-antecedentes-2/medicina-antecedentes-2.component';
import { MedicinaInmunizacionesComponent } from './components/medicina-inmunizaciones/medicina-inmunizaciones.component';
import { MedicinaHabitosComponent } from './components/medicina-habitos/medicina-habitos.component';
import { MedicinaRevisionSistemasComponent } from './components/medicina-revision-sistemas/medicina-revision-sistemas.component';
import { MedicinaFactorRiesgoComponent } from './components/medicina-factor-riesgo/medicina-factor-riesgo.component';
import { MedicinaAntecedentesOcupacionalesComponent } from './components/medicina-antecedentes-ocupacionales/medicina-antecedentes-ocupacionales.component';
import { MedicinaDatosOcupacionalesComponent } from './components/medicina-datos-ocupacionales/medicina-datos-ocupacionales.component';


@NgModule({
  declarations: [
    MedicinaComponent,
    MedicinaAntecedentesComponent,
    MedicinaAntecedentes2Component,
    MedicinaInmunizacionesComponent,
    MedicinaHabitosComponent,
    MedicinaRevisionSistemasComponent,
    MedicinaFactorRiesgoComponent,
    MedicinaAntecedentesOcupacionalesComponent,
    MedicinaDatosOcupacionalesComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    MedicinaComponent
  ]
})

export class MedicinaModule { }
