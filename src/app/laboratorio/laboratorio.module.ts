import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { FormLaboratorioInformacionPersonalComponent } from './components/form-laboratorio-informacion-personal/form-laboratorio-informacion-personal.component';
import { LaboratorioComponent } from './pages/laboratorio.component';

@NgModule({
  declarations: [
    FormLaboratorioInformacionPersonalComponent,
    LaboratorioComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],  
  exports:[
    LaboratorioComponent
  ]
})
export class LaboratorioModule { }
