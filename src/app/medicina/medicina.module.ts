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
import { MedicinaRoutingModule } from './medicina-routing.module';
import { NavbarConfiguracionRutasService } from '../shared/services/navbar-configuracion-rutas.service';
import { MedicinaCierreHistoriaClinicaComponent } from './components/medicina-cierre-historia-clinica/medicina-cierre-historia-clinica.component';


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
    MedicinaDatosOcupacionalesComponent,
    MedicinaCierreHistoriaClinicaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MedicinaRoutingModule
  ],
  exports:[
    MedicinaComponent
  ]
})

export class MedicinaModule {
  constructor(navBar: NavbarConfiguracionRutasService) {
    navBar.definirRutaDatosPaciente('/historias/medicina');
    navBar.definirRutaHistoriaClinica('/historias/medicina/1');
  }
}
