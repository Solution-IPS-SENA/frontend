import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CertificacionesComponent } from './pages/certificaciones.component';
import { CertificacionesAptitudOcupacionalComponent } from './components/certificaciones-aptitud-ocupacional/certificaciones-aptitud-ocupacional.component';
import { CertificacionesRemisionComponent } from './components/certificaciones-remision/certificaciones-remision.component';

const routes: Routes = [
  { path: '', component: CertificacionesComponent,
  children: [
    { path: '', pathMatch: 'full', component: CertificacionesAptitudOcupacionalComponent  },
    { path: '1', component: CertificacionesRemisionComponent}

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
export class CertificacionesRoutingModule {

}
