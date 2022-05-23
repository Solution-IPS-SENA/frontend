import { Component, OnInit } from '@angular/core';
import { InputDatosDoble, InputDatos } from 'src/app/shared/interfaces/input-datos';
import { delay, Observable, of } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';

@Component({
  selector: 'app-medicina-antecedentes',
  templateUrl: './medicina-antecedentes.component.html',
  styleUrls: ['./medicina-antecedentes.component.css']
})
export class MedicinaAntecedentesComponent implements OnInit {

  patologicos = [];
  referencia = [];
  ets = [];

  loaded$ = of(false);

  inputsFamiliares$?: Observable<InputDatosDoble[]> = of([
    { id: "padre", nombre: "Padre",options: this.patologicos, options2: this.patologicos},
    { id: "madre", nombre: "Madre", options: this.patologicos, options2: this.patologicos},
  ]);

  inputsPersonales$?: Observable<InputDatos[]> = of([
    { id: "patologicos", nombre: "Patológicos", for: "patologicos", options: this.patologicos},
    { id: "quirurgicos", nombre: "Quirúrgicos", for: "quirurgicos", options: this.patologicos},
    { id: "traumaticos", nombre: "Traumáticos", for: "traumaticos", options: this.patologicos},
    { id: "toxicos", nombre: "Tóxicos", for: "toxicos" , options: this.patologicos},
    { id: "alergicos", nombre: "Alérgicos", for: "alergicos", options: this.patologicos},
    { id: "farmacologicos", nombre: "Farmacológicos", for: "farmacologicos", options: this.patologicos},
    { id: "transfusionales", nombre: "Transfusionales", for: "transfusionales" , options: this.patologicos},
    { id: "ets", nombre: "E.T.S", for: "ets" , options: this.patologicos},
  ]);

  constructor(private obtenerAnexosService: ObtenerAnexosService){
    this.obtenerAnexosService.getAnexos(["patologicos","referencia","ets"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.patologicos = this.formatear_datos(response.patologicos)
        this.referencia = this.formatear_datos(response.referencia)
        this.ets = this.formatear_datos(response.ets)

        this.inputsFamiliares$ = of([
          { id: "padre", nombre: "Padre",options: this.patologicos, options2: this.patologicos},
          { id: "madre", nombre: "Madre", options: this.patologicos, options2: this.patologicos},
        ])
        this.inputsPersonales$ = of([
          { id: "patologicos", nombre: "Patológicos", for: "patologicos", options: this.patologicos},
          { id: "quirurgicos", nombre: "Quirúrgicos", for: "quirurgicos", options: this.referencia},
          { id: "traumaticos", nombre: "Traumáticos", for: "traumaticos", options: this.referencia},
          { id: "toxicos", nombre: "Tóxicos", for: "toxicos" , options: this.referencia},
          { id: "alergicos", nombre: "Alérgicos", for: "alergicos", options: this.referencia},
          { id: "farmacologicos", nombre: "Farmacológicos", for: "farmacologicos", options: this.referencia},
          { id: "transfusionales", nombre: "Transfusionales", for: "transfusionales" , options: this.referencia},
          { id: "ets", nombre: "E.T.S", for: "ets" , options: this.ets},
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