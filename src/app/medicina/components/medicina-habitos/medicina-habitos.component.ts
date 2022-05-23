import { Component, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { delay, Observable, of } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';

@Component({
  selector: 'app-medicina-habitos',
  templateUrl: './medicina-habitos.component.html',
  styleUrls: ['./medicina-habitos.component.css']
})
export class MedicinaHabitosComponent implements OnInit {

  sino = [];

  loaded$ = of(false);

  inputs$?: Observable<InputDatos[]> = of([
    { id: "cigarrillo", nombre: "Cigarrillo", for: "cigarrillo", options: this.sino},
    { id: "alcohol", nombre: "Alcohol", for: "alcohol", options: this.sino},
    { id: "drogas", nombre: "Drogas", for: "drogas", options: this.sino},
    { id: "deportes", nombre: "Deportes", for: "deportes", options: this.sino},
    { id: "lesiones", nombre: "Lesiones", for: "lesiones", options: this.sino}
  ]);

  constructor(private obtenerAnexosService: ObtenerAnexosService){
    this.obtenerAnexosService.getAnexos(["sino"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.sino = this.formatear_datos(response.sino)

        this.inputs$ = of([
          { id: "cigarrillo", nombre: "Cigarrillo", for: "cigarrillo", options: this.sino},
          { id: "alcohol", nombre: "Alcohol", for: "alcohol", options: this.sino},
          { id: "drogas", nombre: "Drogas", for: "drogas", options: this.sino},
          { id: "deportes", nombre: "Deportes", for: "deportes", options: this.sino},
          { id: "lesiones", nombre: "Lesiones", for: "lesiones", options: this.sino}
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