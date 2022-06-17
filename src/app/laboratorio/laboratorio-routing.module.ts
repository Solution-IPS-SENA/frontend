import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { formularioPrincipalComponent } from '../shared/pages/formularioPrincipal.component';
import { LaboratorioComponent } from './pages/laboratorio.component';
import { LaboratorioExamenesComponent } from './components/laboratorio-examenes/laboratorio-examenes.component';
import { LaboratorioExamenes2Component } from './components/laboratorio-examenes2/laboratorio-examenes2.component';
import { LaboratorioCierreHistoriaClinicaComponent } from './components/laboratorio-cierre-historia-clinica/laboratorio-cierre-historia-clinica.component';


const routes: Routes = [
  { path: '', component: LaboratorioComponent,
  children: [
    { path: '', pathMatch: 'full', component: formularioPrincipalComponent  },
    { path: '1', component: LaboratorioExamenesComponent},
    { path: '2', component: LaboratorioExamenes2Component },
    { path: '3', component: LaboratorioCierreHistoriaClinicaComponent }

  ]},
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
export class LaboratorioRoutingModule {

}
