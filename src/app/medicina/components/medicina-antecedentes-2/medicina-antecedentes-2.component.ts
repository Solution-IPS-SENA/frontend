import { Component, OnInit } from '@angular/core';
import { InputDatosType } from 'src/app/shared/interfaces/input-datos';
import { delay, Observable, of } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';

@Component({
  selector: 'app-medicina-antecedentes-2',
  templateUrl: './medicina-antecedentes-2.component.html',
  styleUrls: ['./medicina-antecedentes-2.component.css']
})
export class MedicinaAntecedentes2Component implements OnInit {

  sino = [];
  normalidad = [];

  loaded$ = of(false);

  inputs$?: Observable<InputDatosType[]> = of([
    { id: "fupFecha", nombre: "FUP (Fecha)", for: "fupFecha", type: "date" },
    { id: "fumFecha", nombre: "FUM (Fecha)", for: "fumFecha", type: "date"},
    { id: "planifica", nombre: "Planifica", for: "planifica", type: "select", options: this.sino},
    { id: "dismenorrea", nombre: "Dismenorrea", for: "dismenorrea", type: "select", options: this.sino},
    { id: "dispareunia", nombre: "Dispareunia", for: "dispareunia", type: "select", options: this.sino},
    { id: "ecoMamaria", nombre: "Eco - Mamaria", for: "ecoMamaria", type: "date"},
    { id: "cicloMenstrual", nombre: "Ciclo menstrual", for: "cicloMenstrual", type: "select", options: this.normalidad},
  ]);

  constructor(private obtenerAnexosService: ObtenerAnexosService){
    this.obtenerAnexosService.getAnexos(["sino","normalidad"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.sino = this.formatear_datos(response.sino)
        this.normalidad = this.formatear_datos(response.normalidad)

        this.inputs$ = of([
          { id: "fupFecha", nombre: "FUP (Fecha)", for: "fupFecha", type: "date" },
          { id: "fumFecha", nombre: "FUM (Fecha)", for: "fumFecha", type: "date"},
          { id: "planifica", nombre: "Planifica", for: "planifica", type: "select", options: this.sino},
          { id: "dismenorrea", nombre: "Dismenorrea", for: "dismenorrea", type: "select", options: this.sino},
          { id: "dispareunia", nombre: "Dispareunia", for: "dispareunia", type: "select", options: this.sino},
          { id: "ecoMamaria", nombre: "Eco - Mamaria", for: "ecoMamaria", type: "date"},
          { id: "cicloMenstrual", nombre: "Ciclo menstrual", for: "cicloMenstrual", type: "select", options: this.normalidad},
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
