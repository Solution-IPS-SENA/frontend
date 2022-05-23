import { Component, OnInit } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { ObtenerAnexosService } from 'src/app/shared/services/obtener-anexos.service';

@Component({
  selector: 'app-optometria-antecedentes-personales',
  templateUrl: './optometria-antecedentes-personales.component.html',
  styleUrls: ['./optometria-antecedentes-personales.component.css']
})
export class OptometriaAntecedentesPersonalesComponent implements OnInit {

  sino: any = [];
  loaded$ = of(false);

  inputs$?: Observable<InputDatos[]> = of([
    { id: "defectosRefractivos", nombre: "Defectos refractivos", for: "defectosRefractivos", img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "cxOcular", nombre: "CX Ocular", for: "cxOcular", img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "estrabismos", nombre: "Estrabismos", for: "estrabismos", img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "patologiasOculares", nombre: "Patologias oculares", for: "patologiasOculares",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "ttoOrtoptico", nombre: "TTO ortoptico", for: "ttoOrtoptico",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "hipertensionArterial", nombre: "Hipertension arterial", for: "hipertensionArterial",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "diabetesMellitus", nombre: "Diabetes mellitus", for: "diabetesMellitus",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "desordenesTiroides", nombre: "Desordenes tiroides", for: "desordenesTiroides",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "observacionesAntecedentesPersonalesOpto", nombre: "Observaciones", for: "observacionesAntecedentesPersonalesOpto",img:"../../../../assets/logos/003.jpg" },
    { id: "accidenteCerebroVascular", nombre: "Accidente cerebro vascular", for: "accidenteCerebroVascular",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "traumaCraneoEncefalico", nombre: "Trauma craneo encefalico", for: "traumaCraneoEncefalico",img:"../../../../assets/logos/026.JPG", options: this.sino },
  ]);

  constructor(private obtenerAnexosService: ObtenerAnexosService){
    this.obtenerAnexosService.getAnexos(["sino"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.sino = this.formatear_datos(response.sino)

        this.inputs$ = of([
          { id: "defectosRefractivos", nombre: "Defectos refractivos", for: "defectosRefractivos", img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "cxOcular", nombre: "CX Ocular", for: "cxOcular", img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "estrabismos", nombre: "Estrabismos", for: "estrabismos", img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "patologiasOculares", nombre: "Patologias oculares", for: "patologiasOculares",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "ttoOrtoptico", nombre: "TTO ortoptico", for: "ttoOrtoptico",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "hipertensionArterial", nombre: "Hipertension arterial", for: "hipertensionArterial",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "diabetesMellitus", nombre: "Diabetes mellitus", for: "diabetesMellitus",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "desordenesTiroides", nombre: "Desordenes tiroides", for: "desordenesTiroides",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "observacionesAntecedentesPersonalesOpto", nombre: "Observaciones", for: "observacionesAntecedentesPersonalesOpto",img:"../../../../assets/logos/003.jpg" },
          { id: "accidenteCerebroVascular", nombre: "Accidente cerebro vascular", for: "accidenteCerebroVascular",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "traumaCraneoEncefalico", nombre: "Trauma craneo encefalico", for: "traumaCraneoEncefalico",img:"../../../../assets/logos/026.JPG", options: this.sino },
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
