import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PsicologiaComponent } from './pages/psicologia.component';
import { PsicologiaEmpresaComponent } from './components/psicologia-empresa/psicologia-empresa.component';
import { PsicologiaAccidentesEnfermedadesComponent } from './components/psicologia-accidentes-enfermedades/psicologia-accidentes-enfermedades.component';
import { formularioPrincipalComponent } from '../shared/pages/formularioPrincipal.component';
import { PsicologiaObservacionConductasComponent } from './components/psicologia-observacion-conductas/psicologia-observacion-conductas.component';
import { PsicologiaCierreHistoriaClinicaComponent } from './components/psicologia-cierre-historia-clinica/psicologia-cierre-historia-clinica.component';
import { MedicoGuard } from '../shared/guards/medico.guard';


const routes: Routes = [
  { path: '', component: PsicologiaComponent, canActivate: [MedicoGuard],
  children: [
    { path: '', pathMatch: 'full', component: formularioPrincipalComponent  },
    { path: '1', component: PsicologiaAccidentesEnfermedadesComponent },
    { path: '2', component: PsicologiaObservacionConductasComponent },
    { path: '3', component: PsicologiaEmpresaComponent },
    { path: '4', component: PsicologiaCierreHistoriaClinicaComponent }
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
export class PsicologiaRoutingModule {

}
