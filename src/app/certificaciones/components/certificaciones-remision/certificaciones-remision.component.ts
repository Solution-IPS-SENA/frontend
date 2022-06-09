import { Component, OnInit } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { ObtenerAnexosService } from 'src/app/shared/services/obtener-anexos.service';

@Component({
  selector: 'app-certificaciones-remision',
  templateUrl: './certificaciones-remision.component.html',
  styleUrls: ['./certificaciones-remision.component.css']
})
export class CertificacionesRemisionComponent implements OnInit {
  remitido = [];
  loaded$ = of(false);

  inputs$?: Observable<InputDatos[]> = of([
    { id: "dni", nombre: "DNI", type: "text"},
    { id: "nombreRemision", nombre: "Nombre", type: "text" },
    { id: "empresa", nombre: "Empresa", type: "text"}
  ]);

  inputsCol2$?: Observable<InputDatos[]> = of([
    { id: "psicologia", nombre: "Psicologia", options: this.remitido}
  ]);

  inputsCol3$?: Observable<InputDatos[]> = of([
    { id: "registro", nombre: "Registro / TP", type: "text"},
    { id: "nombreFirma", nombre: "Nombre", type: "text" }
  ]);

  constructor(private obtenerAnexosService: ObtenerAnexosService){
    this.obtenerAnexosService.getAnexos(["id","remitido"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {

        this.remitido = this.formatear_datos(response.remitido)

        this.inputs$ = of([
          { id: "dni", nombre: "dni", type: "text"},
          { id: "nombreRemision", nombre: "nombre", type: "text" },
          { id: "empresa", nombre: "empresa", type: "text"}
  ])
        this.inputsCol2$ = of([
          { id: "psicologia", nombre: "Psicologia", options: this.remitido}
  ])
        this.inputsCol3$ = of([
          { id: "registro", nombre: "Registro / TP", type: "text"},
          { id: "nombreFirma", nombre: "Nombre", type: "text" }
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
