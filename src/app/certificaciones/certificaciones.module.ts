import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { CertificacionesRoutingModule } from './certificaciones-routing.module';
import { CertificacionesComponent } from './pages/certificaciones.component';
import { CertificacionesAptitudOcupacionalComponent } from './components/certificaciones-aptitud-ocupacional/certificaciones-aptitud-ocupacional.component';
import { CertificacionesRemisionComponent } from './components/certificaciones-remision/certificaciones-remision.component';
import { NavbarConfiguracionRutasService } from '../shared/services/navbar-configuracion-rutas.service';

@NgModule({
  declarations: [
    CertificacionesComponent,
    CertificacionesAptitudOcupacionalComponent,
    CertificacionesRemisionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CertificacionesRoutingModule
  ],
  exports:[
  ]
})
export class CertificacionesModule {
  constructor(navBar: NavbarConfiguracionRutasService) {
    navBar.definirRutaDatosPaciente('/historias/certificaciones');
    navBar.definirRutaHistoriaClinica('/historias/certificaciones/1');
  }
 }
