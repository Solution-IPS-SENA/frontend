import { Component, Input, OnInit } from '@angular/core';
import { InputDatos } from '../../interfaces/input-datos';
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

  inputs$?: Observable<InputDatos[]> = of([
    { id: "nombres", nombre: "Nombres", type: "text", for: "nombres" },
    { id: "apellidos", nombre: "Apellidos", type: "text", for: "apellidos" },
    { id: "fecha_nacimiento", nombre: "Fecha de Nacimiento", type: "date", for: "fecha_nacimiento" },
    { id: "edad", nombre: "Edad", type: "text", for: "edad" },
    { id: "nacionalidad", nombre: "Nacionalidad", type: "select", for: "nacionalidad", options: this.paises},
    { id: "lugar_nacimiento", nombre: "Lugar de Nacimiento", type: "select", for: "lugar_nacimiento",options: this.lugarDeNacimiento},
    { id: "genero", nombre: "Genero", type: "select", for: "genero",options: this.genero},
    { id: "direccion", nombre: "Direccion", type: "text", for: "direccion" },
    { id: "telefono", nombre: "Telefono", type: "text", for: "telefono" }
  ]);

  constructor(
    private obtenerAnexosService: ObtenerAnexosService,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.obtenerAnexosService.getAnexos(["genero", "lugarDeNacimiento","paises"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.genero = this.obtenerAnexosService.formatear_datos(response.genero)
        this.lugarDeNacimiento = this.obtenerAnexosService.formatear_datos(response.lugarDeNacimiento)
        this.paises = this.obtenerAnexosService.formatear_datos(response.paises, 'iso', 'pais')

        this.inputs$ = of([
          { id: "nombres", nombre: "Nombres", type: "text", for: "nombres" },
          { id: "apellidos", nombre: "Apellidos", type: "text", for: "apellidos" },
          { id: "fecha_nacimiento", nombre: "Fecha de Nacimiento", type: "date", for: "fecha_nacimiento" },
          { id: "edad", nombre: "Edad", type: "text", for: "edad" },
          { id: "nacionalidad", nombre: "Nacionalidad", type: "select", for: "nacionalidad", options: this.paises},
          { id: "lugar_nacimiento", nombre: "Lugar de Nacimiento", type: "select", for: "lugar_nacimiento",options: this.lugarDeNacimiento},
          { id: "genero", nombre: "Genero", type: "select", for: "genero",options: this.genero},
          { id: "direccion", nombre: "Direccion", type: "text", for: "direccion" },
          { id: "telefono", nombre: "Telefono", type: "text", for: "telefono" }
        ])
        this.createForm()
        this.loaded$ = of(true);
      }
    )
  }

  createForm(){
    this.form = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      edad: ['', Validators.required],
      nacionalidad: ['' , Validators.required],
      lugar_nacimiento: ['', Validators.required],
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
