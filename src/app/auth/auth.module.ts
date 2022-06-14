import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { AuthRegistroComponent } from './components/auth-registro/auth-registro.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './pages/login.component';
import { RegistroComponent } from './pages/registro.component';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    AuthLoginComponent,
    AuthRegistroComponent,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    AuthRoutingModule
  ],
  exports:[
    LoginComponent,
    RegistroComponent
  ]
})
export class AuthModule { }
