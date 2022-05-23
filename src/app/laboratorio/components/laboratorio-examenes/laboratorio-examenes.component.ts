import { Component, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { delay, Observable, of } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';

@Component({
  selector: 'app-laboratorio-examenes',
  templateUrl: './laboratorio-examenes.component.html',
  styleUrls: ['./laboratorio-examenes.component.css']
})
export class LaboratorioExamenesComponent implements OnInit {

  normalidad = [];
  loaded$ = of(false);

  inputs$?: Observable<InputDatos[]> = of([
    { id: "cuadroHematico", nombre: "Cuadro hematico", for: "cuadroHematico", options: this.normalidad},
    { id: "glicemia", nombre: "Glicemia", for: "glicemia", options: this.normalidad},
    { id: "colesterolTotal", nombre: "Colesterol total", for: "colesterolTotal", options: this.normalidad},
    { id: "colesterolHDL", nombre: "Colesterol hdl", for: "colesterolHDL", options: this.normalidad},
    { id: "colesterolLDL", nombre: "Colesterol ldl", for: "colesterolLDL", options: this.normalidad},
    { id: "trigliceridos", nombre: "Trigliceridos", for: "trigliceridos", options: this.normalidad},
    { id: "parcialOrina", nombre: "Parcial de orina", for: "parcialOrina", options: this.normalidad},
    { id: "cultivoOrina", nombre: "Cultivo de orina", for: "cultivoOrina", options: this.normalidad},
    { id: "coprologico", nombre: "Coprologico", for: "coprologico", options: this.normalidad},
    { id: "frotisFaringeo", nombre: "Frotis faringeo", for: "frotisFaringeo", options: this.normalidad},
    { id: "cultivoFaringeo", nombre: "Cultivo faringeo", for: "cultivoFaringeo", options: this.normalidad},
    { id: "koh", nombre: "Koh", for: "koh", options: this.normalidad},
  ]);

  constructor(private obtenerAnexosService: ObtenerAnexosService){
    this.obtenerAnexosService.getAnexos(["normalidad"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.normalidad = this.formatear_datos(response.normalidad)

        this.inputs$ = of([
          { id: "cuadroHematico", nombre: "Cuadro hematico", for: "cuadroHematico", options: this.normalidad},
          { id: "glicemia", nombre: "Glicemia", for: "glicemia", options: this.normalidad},
          { id: "colesterolTotal", nombre: "Colesterol total", for: "colesterolTotal", options: this.normalidad},
          { id: "colesterolHDL", nombre: "Colesterol hdl", for: "colesterolHDL", options: this.normalidad},
          { id: "colesterolLDL", nombre: "Colesterol ldl", for: "colesterolLDL", options: this.normalidad},
          { id: "trigliceridos", nombre: "Trigliceridos", for: "trigliceridos", options: this.normalidad},
          { id: "parcialOrina", nombre: "Parcial de orina", for: "parcialOrina", options: this.normalidad},
          { id: "cultivoOrina", nombre: "Cultivo de orina", for: "cultivoOrina", options: this.normalidad},
          { id: "coprologico", nombre: "Coprologico", for: "coprologico", options: this.normalidad},
          { id: "frotisFaringeo", nombre: "Frotis faringeo", for: "frotisFaringeo", options: this.normalidad},
          { id: "cultivoFaringeo", nombre: "Cultivo faringeo", for: "cultivoFaringeo", options: this.normalidad},
          { id: "koh", nombre: "Koh", for: "koh", options: this.normalidad},
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