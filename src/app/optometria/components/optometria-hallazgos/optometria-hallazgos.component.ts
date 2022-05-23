import { Component, OnInit } from '@angular/core';
import { InputDatosDoble } from 'src/app/shared/interfaces/input-datos';
import { delay, Observable, of, pipe, tap } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';

@Component({
  selector: 'app-optometria-hallazgos',
  templateUrl: './optometria-hallazgos.component.html',
  styleUrls: ['./optometria-hallazgos.component.css']
})
export class OptometriaHallazgosComponent implements OnInit {

  normalidad: any = [];
  loaded$ = of(false);

  inputsHallazgo1$?: Observable<InputDatosDoble[]> = of([
    { id: "examenExterno", nombre: "Examen externo" , img:"../../../../assets/logos/026.JPG", options: this.normalidad, options2: this.normalidad},
    { id: "motilidadOcular", nombre: "Motilidad ocular" , img:"../../../../assets/logos/026.JPG", options: this.normalidad, options2: this.normalidad},
    { id: "oftalmoscopia", nombre: "Oftalmoscopia" , img:"../../../../assets/logos/026.JPG", options: this.normalidad, options2: this.normalidad},
    { id: "campoVisualConfrontacion", nombre: "Campo visual por confrontacion" , img:"../../../../assets/logos/026.JPG", options: this.normalidad, options2: this.normalidad},
  ]);

  inputsHallazgo2$?: Observable<InputDatosDoble[]> = of([
    { id: "ojoDerechoLejos", nombre: "Estereopsis" ,img:"../../../../assets/logos/026.JPG", options: this.normalidad, options2: this.normalidad},
    { id: "ojoIzquierdoLejos", nombre: "Percepcion cromatica" , img:"../../../../assets/logos/026.JPG",options: this.normalidad, options2: this.normalidad},
    { id: "observacionesOptoHallazgos", nombre: "Observaciones",img:"../../../../assets/logos/003.jpg"}
  ]);



  constructor(private obtenerAnexosService: ObtenerAnexosService){
    this.obtenerAnexosService.getAnexos(["normalidad"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.normalidad = this.formatear_datos(response.normalidad)

        this.inputsHallazgo1$ = of([
          { id: "examenExterno", nombre: "Examen externo" , img:"../../../../assets/logos/026.JPG", options: this.normalidad, options2: this.normalidad},
          { id: "motilidadOcular", nombre: "Motilidad ocular" , img:"../../../../assets/logos/026.JPG", options: this.normalidad, options2: this.normalidad},
          { id: "oftalmoscopia", nombre: "Oftalmoscopia" , img:"../../../../assets/logos/026.JPG", options: this.normalidad, options2: this.normalidad},
          { id: "campoVisualConfrontacion", nombre: "Campo visual por confrontacion" , img:"../../../../assets/logos/026.JPG", options: this.normalidad, options2: this.normalidad},
        ])

        this.inputsHallazgo2$ = of([
          { id: "ojoDerechoLejos", nombre: "Estereopsis" ,img:"../../../../assets/logos/026.JPG", options: this.normalidad, options2: this.normalidad},
          { id: "ojoIzquierdoLejos", nombre: "Percepcion cromatica" , img:"../../../../assets/logos/026.JPG",options: this.normalidad, options2: this.normalidad},
          { id: "observacionesOptoHallazgos", nombre: "Observaciones",img:"../../../../assets/logos/003.jpg"}
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
