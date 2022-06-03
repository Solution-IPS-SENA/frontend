import { Component } from "@angular/core";

@Component({
    selector: 'registro',
    templateUrl: './registro.html',
})
export class RegistroComponent {

  titulo: string;

  constructor() {
    this.titulo = 'Registro';
  }

}
