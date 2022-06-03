import { Component } from "@angular/core";
import { NgModule } from "@angular/core";

@Component({
    selector: 'login',
    templateUrl: './login.html',
})
export class LoginComponent {
  titulo: string;

  constructor() {
    this.titulo = 'Ingreso: Usuarios registrados';
  }
}
