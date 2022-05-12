import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedNavBarComponent } from './components/shared-nav-bar/shared-nav-bar.component';
import { SharedObservacionesComponent } from './components/shared-observaciones/shared-observaciones.component';
import { SharedFooterComponent } from './components/shared-footer/shared-footer.component';
import { SharedDatosOcupacionalesComponent } from './components/shared-datos-ocupacionales/shared-datos-ocupacionales.component';
import { SharedDatosPersonalesComponent } from './components/shared-datos-personales/shared-datos-personales.component';
import { SharedNavBarMenusComponent } from './components/shared-nav-bar-menus/shared-nav-bar-menus.component';
import { SharedPrincipalDatosPersonalesComponent } from './components/shared-principal-datos-personales/shared-principal-datos-personales.component';
import { formularioPrincipalComponent } from './pages/formularioPrincipal.component';
import { SharedPaginacionComponent } from './components/shared-paginacion/shared-paginacion.component'

import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    SharedNavBarComponent,
    SharedFooterComponent,
    SharedDatosPersonalesComponent,
    SharedDatosOcupacionalesComponent,
    SharedObservacionesComponent,
    SharedNavBarMenusComponent,
    SharedPrincipalDatosPersonalesComponent,
    formularioPrincipalComponent,
    SharedPaginacionComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports:[
    SharedNavBarComponent,
    SharedFooterComponent,
    SharedDatosPersonalesComponent,
    SharedDatosOcupacionalesComponent,
    SharedObservacionesComponent,
    SharedNavBarMenusComponent,
    formularioPrincipalComponent,
    SharedPaginacionComponent
  ],
})
export class SharedModule { 

}
