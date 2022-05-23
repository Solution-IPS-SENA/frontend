import { Component, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { delay, Observable, of } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';

@Component({
  selector: 'app-optometria-antecedentes-ocupacionales',
  templateUrl: './optometria-antecedentes-ocupacionales.component.html',
  styleUrls: ['./optometria-antecedentes-ocupacionales.component.css']
})
export class OptometriaAntecedentesOcupacionalesComponent implements OnInit {

  sino: any = [];
  loaded$ = of(false);

  inputs$?: Observable<InputDatos[]> = of([
    { id: "exposicionVideoTerminales", nombre: "Exposicion a video - terminales", for: "exposicionVideoTerminales",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "accidenteOcular", nombre: "Accidente Ocular", for: "accidenteOcular",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "temperaturasExtremas", nombre: "Temperaturas extremas", for: "temperaturasExtremas",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "materialParticulado", nombre: "Material particulado", for: "materialParticulado",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "radiacionNoIonizante", nombre: "Radiacion no Ionizante", for: "radiacionNoIonizante",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "radiacionIonizante", nombre: "Radiacion Ionizante", for: "radiacionIonizante",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "exposicionQuimicos", nombre: "Exposicion a quimicos", for: "exposicionQuimicos",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "exposicionSolventes", nombre: "Exposicion a solventes", for: "exposicionSolventes",img:"../../../../assets/logos/026.JPG", options: this.sino },
  ]);

  constructor(private obtenerAnexosService: ObtenerAnexosService){
    this.obtenerAnexosService.getAnexos(["sino"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.sino = this.formatear_datos(response.sino)

        this.inputs$ = of([
          { id: "exposicionVideoTerminales", nombre: "Exposicion a video - terminales", for: "exposicionVideoTerminales",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "accidenteOcular", nombre: "Accidente Ocular", for: "accidenteOcular",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "temperaturasExtremas", nombre: "Temperaturas extremas", for: "temperaturasExtremas",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "materialParticulado", nombre: "Material particulado", for: "materialParticulado",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "radiacionNoIonizante", nombre: "Radiacion no Ionizante", for: "radiacionNoIonizante",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "radiacionIonizante", nombre: "Radiacion Ionizante", for: "radiacionIonizante",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "exposicionQuimicos", nombre: "Exposicion a quimicos", for: "exposicionQuimicos",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "exposicionSolventes", nombre: "Exposicion a solventes", for: "exposicionSolventes",img:"../../../../assets/logos/026.JPG", options: this.sino },
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
