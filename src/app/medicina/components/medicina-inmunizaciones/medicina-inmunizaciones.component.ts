import { Component, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { delay, Observable, of } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';

@Component({
  selector: 'app-medicina-inmunizaciones',
  templateUrl: './medicina-inmunizaciones.component.html',
  styleUrls: ['./medicina-inmunizaciones.component.css']
})
export class MedicinaInmunizacionesComponent implements OnInit {

  nroVacuna = [];

  loaded$ = of(false);

  inputs$?: Observable<InputDatos[]> = of([
    { id: "hepatitisA", nombre: "Hepatitis A", for: "hepatitisA", options: this.nroVacuna},
    { id: "hepatitisB", nombre: "HepatitisB", for: "hepatitisB", options: this.nroVacuna},
    { id: "tripleViral", nombre: "Triple viral", for: "tripleViral", options: this.nroVacuna},
    { id: "tétanos", nombre: "Tétanos", for: "tétanos", options: this.nroVacuna},
    { id: "malaria", nombre: "Malaria", for: "malaria", options: this.nroVacuna},
    { id: "fAmarilla", nombre: "F. Amarilla", for: "fAmarilla", options: this.nroVacuna},
    { id: "fTifoidea", nombre: "F. Tifoidea", for: "fTifoidea", options: this.nroVacuna},
    { id: "covid", nombre: "Covid", for: "covid", options: this.nroVacuna},
  ]);

  constructor(private obtenerAnexosService: ObtenerAnexosService){
    this.obtenerAnexosService.getAnexos(["nroVacuna"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.nroVacuna = this.formatear_datos(response.nroVacuna)

        this.inputs$ = of([
          { id: "hepatitisA", nombre: "Hepatitis A", for: "hepatitisA", options: this.nroVacuna},
          { id: "hepatitisB", nombre: "HepatitisB", for: "hepatitisB", options: this.nroVacuna},
          { id: "tripleViral", nombre: "Triple viral", for: "tripleViral", options: this.nroVacuna},
          { id: "tétanos", nombre: "Tétanos", for: "tétanos", options: this.nroVacuna},
          { id: "malaria", nombre: "Malaria", for: "malaria", options: this.nroVacuna},
          { id: "fAmarilla", nombre: "F. Amarilla", for: "fAmarilla", options: this.nroVacuna},
          { id: "fTifoidea", nombre: "F. Tifoidea", for: "fTifoidea", options: this.nroVacuna},
          { id: "covid", nombre: "Covid", for: "covid", options: this.nroVacuna},
        ])

        this.loaded$ = of(true);
      }
    )
  }

  formatear_datos(objeto: any): any{
    let data: {valor: string, nombre: string}[] = [];
    objeto.forEach((el: any) => {
      data.push(
        {
          valor: el,
          nombre: el
        }
      )
    })
    return data
  }

  ngOnInit(): void {
  }

}
