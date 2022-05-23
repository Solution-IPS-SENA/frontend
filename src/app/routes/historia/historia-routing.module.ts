import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { formularioPrincipalComponent } from 'src/app/shared/pages/formularioPrincipal.component';

const routes: Routes = [
  { path: 'optometria', loadChildren: () => import('../../optometria/optometria.module').then(m => m.OptometriaModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoriaRoutingModule { }
