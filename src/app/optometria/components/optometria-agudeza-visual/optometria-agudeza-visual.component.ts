import { Component, OnInit } from '@angular/core';
import { delay, Observable, of, pipe, tap } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { InputDatosDoble } from 'src/app/shared/interfaces/input-datos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';

@Component({
  selector: 'app-optometria-agudeza-visual',
  templateUrl: './optometria-agudeza-visual.component.html',
  styleUrls: ['./optometria-agudeza-visual.component.css']
})
export class OptometriaAgudezaVisualComponent implements OnInit {

  tiempo = [];
  sino = [];
  lensometria = [];
  agudezaVisual = [];

  loaded$ = of(false);

  
  inputsAVCerca$?: Observable<InputDatosDoble[]> = of([
    { id: "ojoDerechoCerca", nombre: "OD", options: this.agudezaVisual, options2: this.agudezaVisual },
    { id: "ojoIzquierdoCerca", nombre: "OI", options: this.agudezaVisual, options2: this.agudezaVisual },
    { id: "ambosCerca", nombre: "AMBOS", options: this.agudezaVisual, options2: this.agudezaVisual },
  ]);
  inputsAVLejos$?: Observable<InputDatosDoble[]> = of([
    { id: "ojoDerechoLejos", nombre: "OD", options: this.agudezaVisual, options2: this.agudezaVisual },
    { id: "ojoIzquierdoLejos", nombre: "OI", options: this.agudezaVisual, options2: this.agudezaVisual },
    { id: "ambosLejos", nombre: "AMBOS", options: this.agudezaVisual, options2: this.agudezaVisual },
  ]);
  inputsLensometria$?: Observable<InputDatosDoble[]> = of([
    { id: "ojoDerechoLensometria", nombre: "OD", options: this.sino, options2: this.lensometria },
    { id: "ojoIzquierdoLensometria", nombre: "OI", options: this.sino, options2: this.lensometria },
    { id: "tiempoUsoLensometria", nombre: "Tiempo de uso", options: this.tiempo },
  ]);

  constructor(private obtenerAnexosService: ObtenerAnexosService){
    this.obtenerAnexosService.getAnexos(["lensometria", "tiempo", "agudezaVisual", "sino"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.tiempo = this.formatear_datos(response.tiempo);
        this.lensometria = this.formatear_datos(response.lensometria);
        this.agudezaVisual = this.formatear_datos(response.agudezaVisual);
        this.sino = this.formatear_datos(response.sino);

        this.inputsAVCerca$ = of([
          { id: "ojoDerechoCerca", nombre: "OD", options: this.agudezaVisual, options2: this.agudezaVisual },
          { id: "ojoIzquierdoCerca", nombre: "OI", options: this.agudezaVisual, options2: this.agudezaVisual },
          { id: "ambosCerca", nombre: "AMBOS", options: this.agudezaVisual, options2: this.agudezaVisual },
        ]);
        this.inputsAVLejos$ = of([
          { id: "ojoDerechoLejos", nombre: "OD", options: this.agudezaVisual, options2: this.agudezaVisual },
          { id: "ojoIzquierdoLejos", nombre: "OI", options: this.agudezaVisual, options2: this.agudezaVisual },
          { id: "ambosLejos", nombre: "AMBOS", options: this.agudezaVisual, options2: this.agudezaVisual },
        ]);
          
        this.inputsLensometria$= of([
          { id: "ojoDerechoLejos", nombre: "OD", options: this.sino, options2: this.lensometria },
          { id: "ojoIzquierdoLejos", nombre: "OI", options: this.sino, options2: this.lensometria },
          { id: "tiempoUso", nombre: "Tiempo de uso", options: this.tiempo },
        ]);

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
