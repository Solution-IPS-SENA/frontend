import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { MenuModuloClinicoComponent } from './components/menu-modulo-clinico/menu-modulo-clinico.component';
import { MenuModuloRecepcionComponent } from './components/menu-modulo-recepcion/menu-modulo-recepcion.component';
import { MenuModuloAdminPacienteComponent } from './components/menu-modulo-admin-paciente/menu-modulo-admin-paciente.component';
import { MenuModuloContableComponent } from './components/menu-modulo-contable/menu-modulo-contable.component';
import { RecepcionComponent } from './pages/recepcion.component';
import { RecepcionRoutingModule } from './recepcion-routing.module';

@NgModule({
  declarations: [ 
    MenuModuloClinicoComponent,
    MenuModuloRecepcionComponent,
    MenuModuloAdminPacienteComponent,
    MenuModuloContableComponent,
    RecepcionComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RecepcionRoutingModule,
  ],
  exports:[
      RecepcionComponent
  ]
})
export class RecepcionModule { }
