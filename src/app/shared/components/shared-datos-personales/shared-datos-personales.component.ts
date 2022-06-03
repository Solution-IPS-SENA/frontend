import { Component, Input, OnInit } from '@angular/core';
import { InputDatosType } from '../../interfaces/input-datos';
import { delay, Observable, of, pipe, tap } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shared-datos-personales',
  templateUrl: './shared-datos-personales.component.html',
  styleUrls: ['./shared-datos-personales.component.css']
})
export class SharedDatosPersonalesComponent implements OnInit {

  @Input()
  form!: FormGroup;

  genero = [];
  lugarDeNacimiento = [];
  paises = [];

  loaded$ = of(false);

  inputs$?: Observable<InputDatosType[]> = of([
    { id: "nombres", nombre: "Nombres", type: "text", for: "nombres", value: "Ji" },
    { id: "apellidos", nombre: "Apellidos", type: "text", for: "apellidos" },
    { id: "fechaNacimiento", nombre: "Fecha de Nacimiento", type: "date", for: "fechaNacimiento" },
    { id: "edad", nombre: "Edad", type: "text", for: "edad" },
    { id: "nacionalidad", nombre: "Nacionalidad", type: "select", for: "nacionalidad", options: this.paises},
    { id: "lugarNacimiento", nombre: "Lugar de Nacimiento", type: "select", for: "lugarNacimiento",options: this.lugarDeNacimiento},
    { id: "genero", nombre: "Genero", type: "select", for: "genero",options: this.genero},
    { id: "direccion", nombre: "Direccion", type: "text", for: "direccion" },
    { id: "telefono", nombre: "Telefono", type: "text", for: "telefono" }
  ]);

  constructor(private obtenerAnexosService: ObtenerAnexosService, private fb: FormBuilder){

    this.obtenerAnexosService.getAnexos(["genero", "lugarDeNacimiento","paises"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.genero = this.formatear_datos(response.genero)
        this.lugarDeNacimiento = this.formatear_datos(response.lugarDeNacimiento)
        this.paises = this.formatear_datos(response.paises)

        this.inputs$ = of([
          { id: "nombres", nombre: "Nombres", type: "text", for: "nombres", value: "Ji" },
          { id: "apellidos", nombre: "Apellidos", type: "text", for: "apellidos" },
          { id: "fechaNacimiento", nombre: "Fecha de Nacimiento", type: "date", for: "fechaNacimiento" },
          { id: "edad", nombre: "Edad", type: "text", for: "edad" },
          { id: "nacionalidad", nombre: "Nacionalidad", type: "select", for: "nacionalidad", options: this.paises},
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

    this.form = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      edad: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      lugarNacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log("sisas")
    }else{
      console.log("nonas")
    }
  }
}
