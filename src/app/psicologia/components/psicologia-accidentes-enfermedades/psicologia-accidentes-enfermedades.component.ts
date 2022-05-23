import { Component, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { delay, Observable, of } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';

@Component({
  selector: 'app-psicologia-accidentes-enfermedades',
  templateUrl: './psicologia-accidentes-enfermedades.component.html',
  styleUrls: ['./psicologia-accidentes-enfermedades.component.css']
})
export class PsicologiaAccidentesEnfermedadesComponent implements OnInit {

  sino = [];
  loaded$ = of(false);

  inputs$?: Observable<InputDatos[]> = of([
    { id: "tratamientoPsicologico", nombre: "Ha estado en consulta o tratamiento psicologico o psiquiatrico:", for: "tratamientoPsicologico", options: this.sino },
    { id: "enfermedadesPsicologicas", nombre: "Ha sufrido enfermedades psicologicas laborales o derivadas del estres laboral:", for: "enfermedadesPsicologicas", options: this.sino},
    { id: "alteracionesSueño", nombre: "Presenta alteraciones del sueño:", for: "alteracionesSueño",  options: this.sino},
  ]);

  constructor(private obtenerAnexosService: ObtenerAnexosService){
    this.obtenerAnexosService.getAnexos(["sino"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.sino = this.formatear_datos(response.sino)

        this.inputs$ = of([
          { id: "tratamientoPsicologico", nombre: "Ha estado en consulta o tratamiento psicologico o psiquiatrico:", for: "tratamientoPsicologico", options: this.sino },
          { id: "enfermedadesPsicologicas", nombre: "Ha sufrido enfermedades psicologicas laborales o derivadas del estres laboral:", for: "enfermedadesPsicologicas", options: this.sino},
          { id: "alteracionesSueño", nombre: "Presenta alteraciones del sueño:", for: "alteracionesSueño",  options: this.sino},
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
