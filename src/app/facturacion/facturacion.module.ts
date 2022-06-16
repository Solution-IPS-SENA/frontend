import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturacionRoutingModule } from './facturacion-routing.module';

import { SharedModule } from '../shared/shared.module';
import { FacturacionNavbarComponent} from './components/facturacion-navbar/facturacion-navbar.component';
import { FacturacionComponent } from './pages/facturacion/facturacion.component';

@NgModule({
  declarations: [
    FacturacionComponent,
    FacturacionNavbarComponent
  ],
  imports: [
    FacturacionRoutingModule,
    CommonModule,
    SharedModule
  ],
  exports:[
  ]
})
export class FacturacionModule {

 }
