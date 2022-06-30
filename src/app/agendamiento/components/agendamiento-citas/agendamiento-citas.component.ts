import { Component, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { delay, Observable, of } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';


@Component({
  selector: 'app-agendamiento-citas',
  templateUrl: './agendamiento-citas.component.html',
  styleUrls: ['./agendamiento-citas.component.css']
})
export class AgendamientoCitasComponent implements OnInit {

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  sino = [];
  normalidad = [];
  titulo: string;

  loaded$ = of(false);

  inputs$?: Observable<InputDatos[]> = of([
    { id: "servicioAgendamiento", nombre: "Seleccione el servicio", for: "servicioAgendamiento", options: this.sino},
    { id: "profesionalAgendamiento", nombre: "Seleccione el profesional, si es un servicio unico", for: "profesionalAgendamiento", options: this.sino},
  ]);

  constructor(private obtenerAnexosService: ObtenerAnexosService){
    this.titulo = 'Citas Medicas';
    this.myFilter
    this.obtenerAnexosService.getAnexos(["sino","normalidad"]).subscribe(
      (response: InformacionAnexos) => {
        this.sino = this.formatear_datos(response.sino)
        this.normalidad = this.formatear_datos(response.normalidad)

        this.inputs$ = of([
          { id: "servicioAgendamiento", nombre: "Seleccione el servicio", for: "servicioAgendamiento", options: this.sino },
          { id: "profesionalAgendamiento", nombre: "Seleccione el profesional, si es un servicio unico", for: "profesionalAgendamiento", options: this.sino},
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
