import { Component, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { delay, Observable, of } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';

@Component({
  selector: 'app-medicina-revision-sistemas',
  templateUrl: './medicina-revision-sistemas.component.html',
  styleUrls: ['./medicina-revision-sistemas.component.css']
})
export class MedicinaRevisionSistemasComponent implements OnInit {

  referencia = [];

  loaded$ = of(false);

  inputs$?: Observable<InputDatos[]> = of([
    { id: "dermatologico", nombre: "Dermatológico", for: "dermatologico", options: this.referencia},
    { id: "osteomuscular", nombre: "Osteomuscular", for: "osteomuscular", options: this.referencia},
    { id: "osteoarticular", nombre: "Osteoarticular", for: "osteoarticular", options: this.referencia},
    { id: "genitourinario", nombre: "Genitourinario", for: "genitourinario", options: this.referencia},
    { id: "metabolico", nombre: "Metabólico", for: "metabolico", options: this.referencia},
    { id: "neurologico", nombre: "Neurológico", for: "neurologico", options: this.referencia},
    { id: "cardiorespiratorio", nombre: "Cardiorespiratorio", for: "cardiorespiratorio", options: this.referencia},
    { id: "endocrinologico", nombre: "Endocrinológico", for: "endocrinologico", options: this.referencia},
    { id: "urologico", nombre: "Urológico", for: "urologico", options: this.referencia},
    { id: "gastrointestinal", nombre: "Gastrointestinal", for: "gastrointestinal", options: this.referencia},
    { id: "orl", nombre: "ORL", for: "orl", options: this.referencia},
  ]);

  constructor(private obtenerAnexosService: ObtenerAnexosService){
    this.obtenerAnexosService.getAnexos(["referencia"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.referencia = this.formatear_datos(response.referencia)

        this.inputs$ = of([
          { id: "dermatologico", nombre: "Dermatológico", for: "dermatologico", options: this.referencia},
          { id: "osteomuscular", nombre: "Osteomuscular", for: "osteomuscular", options: this.referencia},
          { id: "osteoarticular", nombre: "Osteoarticular", for: "osteoarticular", options: this.referencia},
          { id: "genitourinario", nombre: "Genitourinario", for: "genitourinario", options: this.referencia},
          { id: "metabolico", nombre: "Metabólico", for: "metabolico", options: this.referencia},
          { id: "neurologico", nombre: "Neurológico", for: "neurologico", options: this.referencia},
          { id: "cardiorespiratorio", nombre: "Cardiorespiratorio", for: "cardiorespiratorio", options: this.referencia},
          { id: "endocrinologico", nombre: "Endocrinológico", for: "endocrinologico", options: this.referencia},
          { id: "urologico", nombre: "Urológico", for: "urologico", options: this.referencia},
          { id: "osteomuscular", nombre: "Osteomuscular", for: "osteomuscular", options: this.referencia},
          { id: "gastrointestinal", nombre: "Gastrointestinal", for: "gastrointestinal", options: this.referencia},
          { id: "orl", nombre: "ORL", for: "orl", options: this.referencia},
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
