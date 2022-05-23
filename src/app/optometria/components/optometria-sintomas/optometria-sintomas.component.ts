import { Component, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { delay, Observable, of } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';

@Component({
  selector: 'app-optometria-sintomas',
  templateUrl: './optometria-sintomas.component.html',
  styleUrls: ['./optometria-sintomas.component.css']
})
export class OptometriaSintomasComponent implements OnInit {

  sino: any = [];
  loaded$ = of(false);

  inputs$?: Observable<InputDatos[]> = of([
    { id: "malaVisionLejos", nombre: "Mala vision de lejos", for: "malaVisionLejos", img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "malaVisionCerca", nombre: "Mala vision de cerca", for: "malaVisionCerca", img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "cefalea", nombre: "Cefalea", for: "cefalea", img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "hiperemia", nombre: "Hiperemia", for: "hiperemia", img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "visionDoble", nombre: "Vision doble", for: "visionDoble", img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "vertigo", nombre: "Vertigo", for: "vertigo", img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "lagrimeo", nombre: "Lagrimeo", for: "lagrimeo", img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "mareo", nombre: "Mareo", for: "mareo", img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "otroSintomasOpto", nombre: "Otro", for: "otroSintomasOpto", img:"../../../../assets/logos/003.jpg"},
    { id: "Secrecion", nombre: "Secreción", for: "Secrecion",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "resequedadOcular", nombre: "Resequedad ocular", for: "resequedadOcular", img:"../../../../assets/logos/026.JPG", options: this.sino },
  ]);

  constructor(private obtenerAnexosService: ObtenerAnexosService){
    this.obtenerAnexosService.getAnexos(["sino"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.sino = this.formatear_datos(response.sino)

        this.inputs$ = of([
          { id: "malaVisionLejos", nombre: "Mala vision de lejos", for: "malaVisionLejos", img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "malaVisionCerca", nombre: "Mala vision de cerca", for: "malaVisionCerca", img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "cefalea", nombre: "Cefalea", for: "cefalea", img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "hiperemia", nombre: "Hiperemia", for: "hiperemia", img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "visionDoble", nombre: "Vision doble", for: "visionDoble", img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "vertigo", nombre: "Vertigo", for: "vertigo", img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "lagrimeo", nombre: "Lagrimeo", for: "lagrimeo", img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "mareo", nombre: "Mareo", for: "mareo", img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "otroSintomasOpto", nombre: "Otro", for: "otroSintomasOpto", img:"../../../../assets/logos/003.jpg"},
          { id: "Secrecion", nombre: "Secreción", for: "Secrecion",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "resequedadOcular", nombre: "Resequedad ocular", for: "resequedadOcular", img:"../../../../assets/logos/026.JPG", options: this.sino },

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
