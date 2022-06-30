import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { formularioPrincipalComponent } from '../shared/pages/formularioPrincipal.component';
import { LaboratorioComponent } from './pages/laboratorio.component';
import { LaboratorioExamenesComponent } from './components/laboratorio-examenes/laboratorio-examenes.component';
import { LaboratorioExamenes2Component } from './components/laboratorio-examenes2/laboratorio-examenes2.component';
import { MedicoGuard } from '../shared/guards/medico.guard';

const routes: Routes = [
  { path: '', component: LaboratorioComponent, canActivate: [MedicoGuard],
  children: [
    { path: '', pathMatch: 'full', component: formularioPrincipalComponent  },
    { path: '1', component: LaboratorioExamenesComponent},
    { path: '2', component: LaboratorioExamenes2Component },
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
