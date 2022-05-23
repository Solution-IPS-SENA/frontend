import { Component, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { delay, Observable, of } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';

@Component({
  selector: 'app-laboratorio-examenes2',
  templateUrl: './laboratorio-examenes2.component.html',
  styleUrls: ['./laboratorio-examenes2.component.css']
})
export class LaboratorioExamenes2Component implements OnInit {

  normalidad = [];
  loaded$ = of(false);

  inputs$?: Observable<InputDatos[]> = of([
    { id: "tsh", nombre: "Tsh", for: "tsh", options: this.normalidad},
    { id: "creatinina", nombre: "Creatinina", for: "creatinina", options: this.normalidad},
    { id: "pruebasFuncionHepatica", nombre: "Pruebas función hepática", for: "pruebasFuncionHepatica", options: this.normalidad},
    { id: "proteinaCReactiva", nombre: "Proteina C reactiva", for: "proteinaCReactiva", options: this.normalidad},
    { id: "tiempoProtrombina", nombre: "Pt (Tiempo de protrombina)", for: "tiempoProtrombina", options: this.normalidad},
    { id: "tiempoParcialTromboplastina", nombre: "Ptt (Tiempo parcial de tromboplastina)", for: "tiempoParcialTromboplastina", options: this.normalidad},
    { id: "acidoUrico", nombre: "Ácido úrico", for: "acidoUrico", options: this.normalidad},
    { id: "antigenoProstatico", nombre: "Antigeno prostático", for: "antigenoProstatico", options: this.normalidad},
    { id: "gasesArteriales", nombre: "Gases arteriales", for: "gasesArteriales", options: this.normalidad},
    { id: "vdrl", nombre: "Vdrl", for: "vdrl", options: this.normalidad},
    { id: "gravidez", nombre: "Gravidez", for: "gravidez", options: this.normalidad},
    { id: "otro", nombre: "Otro", for: "otro", options: this.normalidad},
  ]);

  constructor(private obtenerAnexosService: ObtenerAnexosService){
    this.obtenerAnexosService.getAnexos(["normalidad"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.normalidad = this.formatear_datos(response.normalidad)

        this.inputs$ = of([
          { id: "tsh", nombre: "Tsh", for: "tsh", options: this.normalidad},
          { id: "creatinina", nombre: "Creatinina", for: "creatinina", options: this.normalidad},
          { id: "pruebasFuncionHepatica", nombre: "Pruebas función hepática", for: "pruebasFuncionHepatica", options: this.normalidad},
          { id: "proteinaCReactiva", nombre: "Proteina C reactiva", for: "proteinaCReactiva", options: this.normalidad},
          { id: "tiempoProtrombina", nombre: "Pt (Tiempo de protrombina)", for: "tiempoProtrombina", options: this.normalidad},
          { id: "tiempoParcialTromboplastina", nombre: "Ptt (Tiempo parcial de tromboplastina)", for: "tiempoParcialTromboplastina", options: this.normalidad},
          { id: "acidoUrico", nombre: "Ácido úrico", for: "acidoUrico", options: this.normalidad},
          { id: "antigenoProstatico", nombre: "Antigeno prostático", for: "antigenoProstatico", options: this.normalidad},
          { id: "gasesArteriales", nombre: "Gases arteriales", for: "gasesArteriales", options: this.normalidad},
          { id: "vdrl", nombre: "Vdrl", for: "vdrl", options: this.normalidad},
          { id: "gravidez", nombre: "Gravidez", for: "gravidez", options: this.normalidad},
          { id: "otro", nombre: "Otro", for: "otro", options: this.normalidad},
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
