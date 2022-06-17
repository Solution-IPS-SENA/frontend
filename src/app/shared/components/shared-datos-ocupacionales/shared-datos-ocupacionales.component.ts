import { Component, OnInit} from '@angular/core';
import { InputDatos } from '../../interfaces/input-datos';
import { delay, Observable, of, pipe, tap } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';

@Component({
  selector: 'app-shared-datos-ocupacionales',
  templateUrl: './shared-datos-ocupacionales.component.html',
  styleUrls: ['./shared-datos-ocupacionales.component.css']
})
export class SharedDatosOcupacionalesComponent implements OnInit {

  eps = [];
  afp = [];
  arl = [];
  loaded$ = of(false);

  inputs$?: Observable<InputDatos[]> = of([
    { id: "empresa", nombre: "Empresa", type: "text", for: "empresa" },
    { id: "cargo", nombre: "Cargo", type: "text", for: "cargo" },
    { id: "fechaIngreso", nombre: "Fecha de Ingreso", type: "date", for: "fechaIngreso" },
    { id: "tiempoCargo", nombre: "Tiempo en Cargo", type: "text", for: "tiempoCargo" },
    { id: "arl", nombre: "ARL", type: "select", for: "arl", options: this.arl},
    { id: "eps", nombre: "EPS", type: "select", for: "eps" , options: this.eps},
    { id: "afp", nombre: "AFP", type: "select", for: "afp" , options: this.afp},
    { id: "correo", nombre: "Correo", type: "text", for: "correo" },
    { id: "telefonoOcupacional", nombre: "Telefono", type: "text", for: "telefonoOcupacional" },
  ]);

  constructor(private obtenerAnexosService: ObtenerAnexosService){
    this.obtenerAnexosService.getAnexos(["eps","afp","arl"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.eps = this.obtenerAnexosService.formatear_datos(response.eps)
        this.afp = this.obtenerAnexosService.formatear_datos(response.afp)
        this.arl = this.obtenerAnexosService.formatear_datos(response.arl)


        this.inputs$ = of([
          { id: "empresa", nombre: "Empresa", type: "text", for: "empresa" },
          { id: "cargo", nombre: "Cargo", type: "text", for: "cargo" },
          { id: "fechaIngreso", nombre: "Fecha de Ingreso", type: "date", for: "fechaIngreso" },
          { id: "tiempoCargo", nombre: "Tiempo en Cargo", type: "text", for: "tiempoCargo" },
          { id: "arl", nombre: "ARL", type: "select", for: "arl", options: this.arl},
          { id: "eps", nombre: "EPS", type: "select", for: "eps" , options: this.eps},
          { id: "afp", nombre: "AFP", type: "select", for: "afp" , options: this.afp},
          { id: "correo", nombre: "Correo", type: "text", for: "correo" },
          { id: "telefonoOcupacional", nombre: "Telefono", type: "text", for: "telefonoOcupacional" },
  ])
        this.loaded$ = of(true);
      }
    )
  }

  ngOnInit(): void {
  }
}
