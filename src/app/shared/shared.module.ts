import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedNavBarComponent } from './components/shared-nav-bar/shared-nav-bar.component';
import { SharedObservacionesComponent } from './components/shared-observaciones/shared-observaciones.component';
import { SharedDatosOcupacionalesComponent } from './components/shared-datos-ocupacionales/shared-datos-ocupacionales.component';
import { SharedDatosPersonalesComponent } from './components/shared-datos-personales/shared-datos-personales.component';
import { SharedNavBarMenusComponent } from './components/shared-nav-bar-menus/shared-nav-bar-menus.component';
import { formularioPrincipalComponent } from './pages/formularioPrincipal.component';
import { SharedPaginacionComponent } from './components/shared-paginacion/shared-paginacion.component'

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SharedNavBarComponent,
    SharedDatosPersonalesComponent,
    SharedDatosOcupacionalesComponent,
    SharedObservacionesComponent,
    SharedNavBarMenusComponent,
    formularioPrincipalComponent,
    SharedPaginacionComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports:[
    SharedNavBarComponent,
    SharedDatosPersonalesComponent,
    SharedDatosOcupacionalesComponent,
    SharedObservacionesComponent,
    SharedNavBarMenusComponent,
    formularioPrincipalComponent,
    SharedPaginacionComponent,
    ReactiveFormsModule
  ],
})
export class SharedModule {

}
