import { Component, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { delay, Observable, of } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';

@Component({ 
  selector: 'app-psicologia-observacion-conductas',
  templateUrl: './psicologia-observacion-conductas.component.html',
  styleUrls: ['./psicologia-observacion-conductas.component.css']
})
export class PsicologiaObservacionConductasComponent implements OnInit {

  adecuacion = [];
  loaded$ = of(false);

  inputs$?: Observable<InputDatos[]> = of([
    { id: "presentacion", nombre: "Presentacion", for: "presentacion", options: this.adecuacion},
    { id: "postura", nombre: "Postura", for: "postura", options: this.adecuacion},
    { id: "discursoRitmo", nombre: "Discurso - Ritmo", for: "discursoRitmo", options: this.adecuacion},
    { id: "tono", nombre: "Tono", for: "tono", options: this.adecuacion},
    { id: "articulacion", nombre: "Articulacion", for: "articulacion", options: this.adecuacion},
    { id: "orientacionTiempo", nombre: "Orientacion - Tiempo", for: "orientacionTiempo", options: this.adecuacion},
    { id: "orientacionEspacio", nombre: "Orientacion - Espacio", for: "orientacionEspacio", options: this.adecuacion},
    { id: "orientacionPersona", nombre: "Orientacion - Persona", for: "orientacionPersona", options: this.adecuacion},
  ]);

  constructor(private obtenerAnexosService: ObtenerAnexosService){
    this.obtenerAnexosService.getAnexos(["adecuacion"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.adecuacion = this.formatear_datos(response.adecuacion)

        this.inputs$ = of([
          { id: "presentacion", nombre: "Presentacion", for: "presentacion", options: this.adecuacion},
          { id: "postura", nombre: "Postura", for: "postura", options: this.adecuacion},
          { id: "discursoRitmo", nombre: "Discurso - Ritmo", for: "discursoRitmo", options: this.adecuacion},
          { id: "tono", nombre: "Tono", for: "tono", options: this.adecuacion},
          { id: "articulacion", nombre: "Articulacion", for: "articulacion", options: this.adecuacion},
          { id: "orientacionTiempo", nombre: "Orientacion - Tiempo", for: "orientacionTiempo", options: this.adecuacion},
          { id: "orientacionEspacio", nombre: "Orientacion - Espacio", for: "orientacionEspacio", options: this.adecuacion},
          { id: "orientacionPersona", nombre: "Orientacion - Persona", for: "orientacionPersona", options: this.adecuacion},
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
