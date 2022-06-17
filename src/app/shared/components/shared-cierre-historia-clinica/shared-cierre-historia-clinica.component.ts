import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InputDatos } from '../../interfaces/input-datos';
import { delay, Observable, of } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';

@Component({
  selector: 'app-shared-cierre-historia-clinica',
  templateUrl: './shared-cierre-historia-clinica.component.html',
  styleUrls: ['./shared-cierre-historia-clinica.component.css']
})
export class SharedCierreHistoriaClinicaComponent implements OnInit {

  public currentPage = 0;

  public onPageChange(currentPage: number) {
    this.router.navigate(['/historias', 'fgd', currentPage]).then(() => {
      this.currentPage = this.getCurrentPageUrl();
    });
  }

  public getCurrentPageUrl(): number {
    const urlSegments = this.router.url.split('/');
    return parseInt(urlSegments[urlSegments.length - 1] ?? '0');
  }

  remitido = [];
  concepto = [];
  motivo = [];

  loaded$ = of(false);

  inputs$?: Observable<InputDatos[]> = of([
    { id: "motivo", nombre: "Motivo", for: "motivo", options: this.motivo},
    { id: "remitido", nombre: "Remitido", for: "remitido", options: this.remitido},
  ]);

  inputConcepto$?: Observable<InputDatos[]> = of([
    { id: "concepto", nombre: "Concepto", for: "concepto", options: this.concepto},
  ]);

  constructor(private obtenerAnexosService: ObtenerAnexosService, private router: Router){
    this.currentPage = this.getCurrentPageUrl();
    this.obtenerAnexosService.getAnexos(["motivo","concepto","remitido"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.motivo = this.formatear_datos(response.motivo)
        this.remitido = this.formatear_datos(response.remitido)
        this.concepto = this.formatear_datos(response.concepto)

        this.inputs$ = of([
          { id: "motivo", nombre: "Motivo", for: "motivo", options: this.motivo},
          { id: "remitido", nombre: "Remitido", for: "remitido", options: this.remitido},
        ])

        this.inputConcepto$ = of([
          { id: "concepto", nombre: "Concepto", for: "concepto", options: this.concepto},
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
