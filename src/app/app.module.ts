import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AgendamientoModule } from './agendamiento/agendamiento.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { FonoaudiologiaModule } from './fonoaudiologia/fonoaudiologia.module';
import { LaboratorioModule } from './laboratorio/laboratorio.module';
import { MedicinaModule } from './medicina/medicina.module';
import { OptometriaModule } from './optometria/optometria.module';
import { PsicologiaModule } from './psicologia/psicologia.module';
import { RecepcionModule } from './recepcion/recepcion.module';
import { SharedModule } from './shared/shared.module';



@NgModule({
  declarations: [
    AppComponent 
  ],
  imports: [
    BrowserModule,
    // AuthModule,
    // LaboratorioModule,
    SharedModule,
    // MedicinaModule,
    // FonoaudiologiaModule,
    // OptometriaModule,
    // PsicologiaModule,
    // AgendamientoModule,
    AppRoutingModule
  ], 
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
