import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'optometria', loadChildren: () => import('../../optometria/optometria.module').then(m => m.OptometriaModule) },
  { path: 'medicina', loadChildren: () => import('../../medicina/medicina.module').then(m => m. MedicinaModule) },
  { path: 'psicologia', loadChildren: () => import('../../psicologia/psicologia.module').then(m => m. PsicologiaModule) },
  { path: 'laboratorio', loadChildren: () => import('../../laboratorio/laboratorio.module').then(m => m. LaboratorioModule) },
  { path: 'agendamiento', loadChildren: () => import('../../agendamiento/agendamiento.module').then(m => m. AgendamientoModule) },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoriaRoutingModule { }
