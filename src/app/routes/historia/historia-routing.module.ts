import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicoGuard } from 'src/app/shared/guards/medico.guard';

const routes: Routes = [
  { path: 'optometria', canActivate:[MedicoGuard] ,loadChildren: () => import('../../optometria/optometria.module').then(m => m.OptometriaModule) },
  { path: 'medicina', canActivate:[MedicoGuard] ,loadChildren: () => import('../../medicina/medicina.module').then(m => m. MedicinaModule) },
  { path: 'psicologia', canActivate:[MedicoGuard] ,loadChildren: () => import('../../psicologia/psicologia.module').then(m => m. PsicologiaModule) },
  { path: 'laboratorio', canActivate:[MedicoGuard] ,loadChildren: () => import('../../laboratorio/laboratorio.module').then(m => m. LaboratorioModule) },
  { path: 'agendamiento', canActivate:[MedicoGuard] ,loadChildren: () => import('../../agendamiento/agendamiento.module').then(m => m. AgendamientoModule) },
  { path: 'certificaciones', canActivate:[MedicoGuard] ,loadChildren: () => import('../../certificaciones/certificaciones.module').then(m => m. CertificacionesModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoriaRoutingModule { }
