import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { formularioPrincipalComponent } from '../shared/pages/formularioPrincipal.component';
import { AgendamientoCitasComponent } from './components/agendamiento-citas/agendamiento-citas.component';
import { AgendamientoConsultaCitasComponent } from './components/agendamiento-consulta-citas/agendamiento-consulta-citas.component';
import { CitasComponent } from './pages/citas.components';


const routes: Routes = [
  { path: '', component: CitasComponent,
  children: [
    { path: '', pathMatch: 'full', component: formularioPrincipalComponent },
    { path: '1', component: AgendamientoConsultaCitasComponent },
    { path: '2', component: AgendamientoCitasComponent }
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
export class AgendamientoRoutingModule {

}
