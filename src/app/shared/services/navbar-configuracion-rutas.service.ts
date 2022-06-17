import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarConfiguracionRutasService {

  private datosPaciente = "";
  private historiaClinica = "";

  constructor() { }

  public definirRutaDatosPaciente(route: string) {
    this.datosPaciente = route;
  }

  public definirRutaHistoriaClinica(route: string) {
    this.historiaClinica = route;
  }

  public get rutaDatosPaciente(): string {
    return this.datosPaciente;
  }

  public get rutaHistoriaClinica(): string {
    return this.historiaClinica;
  }

}
