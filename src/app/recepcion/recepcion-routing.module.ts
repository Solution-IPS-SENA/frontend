import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitasComponent } from '../agendamiento/pages/citas.components';
import { OptometriaComponent } from '../optometria/pages/optometria.component';
import { formularioPrincipalComponent } from '../shared/pages/formularioPrincipal.component';
import { RecepcionComponent } from './pages/recepcion.component';

const routes: Routes = [
  { path: 'optometria', component: OptometriaComponent},
  { path: 'datos', component: formularioPrincipalComponent},
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RecepcionRoutingModule { }
