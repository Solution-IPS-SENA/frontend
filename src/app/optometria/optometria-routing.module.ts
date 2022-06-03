import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OptometriaComponent } from './pages/optometria.component';
import { OptometriaAgudezaVisualComponent } from './components/optometria-agudeza-visual/optometria-agudeza-visual.component';
import { formularioPrincipalComponent } from '../shared/pages/formularioPrincipal.component';
import { OptometriaAntecedentesPersonalesComponent } from './components/optometria-antecedentes-personales/optometria-antecedentes-personales.component';
import { OptometriaAntecedentesOcupacionalesComponent } from './components/optometria-antecedentes-ocupacionales/optometria-antecedentes-ocupacionales.component';
import { OptometriaSintomasComponent } from './components/optometria-sintomas/optometria-sintomas.component';
import { OptometriaHallazgosComponent } from './components/optometria-hallazgos/optometria-hallazgos.component';
import { SharedCierreHistoriaClinicaComponent } from '../shared/components/shared-cierre-historia-clinica/shared-cierre-historia-clinica.component';
import { OptometriaCierreHistoriaClinicaComponent } from './components/optometria-cierre-historia-clinica/optometria-cierre-historia-clinica.component';

const routes: Routes = [
  { path: '', component: OptometriaComponent,
      children: [
        { path: '', pathMatch: 'full', component: formularioPrincipalComponent },
        { path: '1', component: OptometriaAntecedentesPersonalesComponent },
        { path: '2', component: OptometriaAntecedentesOcupacionalesComponent },
        { path: '3', component: OptometriaSintomasComponent },
        { path: '4', component: OptometriaAgudezaVisualComponent },
        { path: '5', component: OptometriaHallazgosComponent },
        { path: '6', component: OptometriaCierreHistoriaClinicaComponent }

      ]
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class OptometriaRoutingModule { }
