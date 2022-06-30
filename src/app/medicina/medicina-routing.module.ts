import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MedicinaComponent } from './pages/medicina.component';

import { formularioPrincipalComponent } from '../shared/pages/formularioPrincipal.component';
import { MedicinaAntecedentesComponent } from './components/medicina-antecedentes/medicina-antecedentes.component';
import { MedicinaAntecedentes2Component } from './components/medicina-antecedentes-2/medicina-antecedentes-2.component';
import { MedicinaInmunizacionesComponent } from './components/medicina-inmunizaciones/medicina-inmunizaciones.component';
import { MedicinaHabitosComponent } from './components/medicina-habitos/medicina-habitos.component';
import { MedicinaRevisionSistemasComponent } from './components/medicina-revision-sistemas/medicina-revision-sistemas.component';
import { MedicinaFactorRiesgoComponent } from './components/medicina-factor-riesgo/medicina-factor-riesgo.component';
import { MedicinaAntecedentesOcupacionalesComponent } from './components/medicina-antecedentes-ocupacionales/medicina-antecedentes-ocupacionales.component';
import { MedicinaDatosOcupacionalesComponent } from './components/medicina-datos-ocupacionales/medicina-datos-ocupacionales.component';
import { MedicinaCierreHistoriaClinicaComponent } from './components/medicina-cierre-historia-clinica/medicina-cierre-historia-clinica.component';
import { MedicoGuard } from '../shared/guards/medico.guard';

const routes: Routes = [
  { path: '', component: MedicinaComponent, canActivate: [MedicoGuard],
  children: [
    { path: '', pathMatch: 'full', component: formularioPrincipalComponent },
    { path: '1', component: MedicinaAntecedentesComponent },
    { path: '2', component: MedicinaAntecedentes2Component },
    { path: '3', component: MedicinaInmunizacionesComponent },
    { path: '4', component: MedicinaHabitosComponent },
    { path: '5', component: MedicinaRevisionSistemasComponent },
    { path: '6', component: MedicinaFactorRiesgoComponent },
    { path: '7', component: MedicinaAntecedentesOcupacionalesComponent },
    { path: '8', component: MedicinaDatosOcupacionalesComponent },
    { path: '9', component: MedicinaCierreHistoriaClinicaComponent }

  ]},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class MedicinaRoutingModule {

}
