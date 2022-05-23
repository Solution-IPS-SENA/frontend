import { Component, OnInit } from '@angular/core';
import { InputDatosType } from '../../interfaces/input-datos';
import { delay, Observable, of, pipe, tap } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';

@Component({
  selector: 'app-shared-datos-personales',
  templateUrl: './shared-datos-personales.component.html',
  styleUrls: ['./shared-datos-personales.component.css']
})
export class SharedDatosPersonalesComponent implements OnInit {

  genero = [];
  lugarDeNacimiento = [];
  nacionalidad = [];

  loaded$ = of(false);

  inputs$?: Observable<InputDatosType[]> = of([
    { id: "nombre", nombre: "Nombre", type: "text", for: "nombre" },
    { id: "apellido", nombre: "Apellido", type: "text", for: "apellido" },
    { id: "fechaNacimiento", nombre: "Fecha de Nacimiento", type: "date", for: "fechaNacimiento" },
    { id: "edad", nombre: "Edad", type: "text", for: "edad" },
    { id: "nacionalidad", nombre: "Nacionalidad", type: "select", for: "nacionalidad", options: this.nacionalidad},
    { id: "lugarNacimiento", nombre: "Lugar de Nacimiento", type: "select", for: "lugarNacimiento",options: this.lugarDeNacimiento},
    { id: "genero", nombre: "Genero", type: "select", for: "genero",options: this.genero},
    { id: "direccion", nombre: "Direccion", type: "text", for: "direccion" },
    { id: "telefono", nombre: "Telefono", type: "text", for: "telefono" }
  ]);

  constructor(private obtenerAnexosService: ObtenerAnexosService){
    this.obtenerAnexosService.getAnexos(["genero", "lugarDeNacimiento","nacionalidad"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.genero = this.formatear_datos(response.genero)
        this.lugarDeNacimiento = this.formatear_datos(response.lugarDeNacimiento)
        this.nacionalidad = this.formatear_datos(response.nacionalidad)

        this.inputs$ = of([
          { id: "nombre", nombre: "Nombre", type: "text", for: "nombre" },
          { id: "apellido", nombre: "Apellido", type: "text", for: "apellido" },
          { id: "fechaNacimiento", nombre: "Fecha de Nacimiento", type: "date", for: "fechaNacimiento" },
          { id: "edad", nombre: "Edad", type: "text", for: "edad" },
          { id: "nacionalidad", nombre: "Nacionalidad", type: "select", for: "nacionalidad", options: this.nacionalidad},
          { id: "lugarNacimiento", nombre: "Lugar de Nacimiento", type: "select", for: "lugarNacimiento",options: this.lugarDeNacimiento},
          { id: "genero", nombre: "Genero", type: "select", for: "genero",options: this.genero},
          { id: "direccion", nombre: "Direccion", type: "text", for: "direccion" },
          { id: "telefono", nombre: "Telefono", type: "text", for: "telefono" }
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