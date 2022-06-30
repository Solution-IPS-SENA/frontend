import { Component, Input, OnInit } from '@angular/core';
import { InputDatos } from '../../interfaces/input-datos';
import { filter, Observable, of, startWith } from 'rxjs';
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
  nacExtra$ = of(false)
  lugarDeNacimiento: any = [];
  paises = [];
  loaded$ = of(false);
  inputs$?: Observable<InputDatos[]> = of([

    { id: "nombres", nombre: "Nombres", type: "text", for: "nombres" },
    { id: "apellidos", nombre: "Apellidos", type: "text", for: "apellidos" },
    { id: "fecha_nacimiento", nombre: "Fecha de Nacimiento", type: "date", for: "fecha_nacimiento" },
    { id: "edad", nombre: "Edad", type: "text", for: "edad" },
    { id: "nacionalidad", nombre: "Nacionalidad", type: "select", for: "nacionalidad", options: this.paises},
    { id: "lugar_nacimiento", nombre: "Lugar de Nacimiento", type: "select", for: "lugar_nacimiento",options: this.lugarDeNacimiento},
    { id: "genero", nombre: "Género", type: "select", for: "genero",options: this.genero},
    { id: "direccion", nombre: "Dirección", type: "text", for: "direccion" },
    { id: "telefono", nombre: "Teléfono", type: "text", for: "telefono" }
  ]);

  constructor(
    private obtenerAnexosService: ObtenerAnexosService,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.obtenerAnexosService.getAnexos(["genero", "lugarDeNacimiento","paises"]).subscribe(
      (response: InformacionAnexos) => {
        this.genero = this.obtenerAnexosService.formatear_datos(response.genero)
        this.lugarDeNacimiento = this.obtenerAnexosService.formatear_datos(response.lugarDeNacimiento)
        this.paises = this.obtenerAnexosService.formatear_datos(response.paises, 'iso', 'pais')

        this.inputs$ = of([
          { id: "nombres", nombre: "Nombres", type: "text", for: "nombres" },
          { id: "apellidos", nombre: "Apellidos", type: "text", for: "apellidos" },
          { id: "fecha_nacimiento", nombre: "Fecha de Nacimiento", type: "date", for: "fecha_nacimiento" },
          { id: "edad", nombre: "Edad", type: "text", for: "edad" },
          { id: "nacionalidad", nombre: "Pais de nacimiento", type: "select", for: "nacionalidad", options: this.paises},
          { id: "lugar_nacimiento", nombre: "Lugar de Nacimiento", type: "select", for: "lugar_nacimiento",options: this.lugarDeNacimiento},
          { id: "genero", nombre: "Género", type: "select", for: "genero",options: this.genero},
          { id: "direccion", nombre: "Dirección", type: "text", for: "direccion" },
          { id: "telefono", nombre: "Teléfono", type: "text", for: "telefono" }
        ])
        this.createForm()
        this.loaded$ = of(true);
        let datos: any = localStorage.getItem("datos_paciente");
        if(datos){
          this.form.patchValue(JSON.parse(datos!));
          this.form.controls["edad"].patchValue(this.calcularEdad(JSON.parse(datos!).fecha_nacimiento));
        }
        this.form.get("fecha_nacimiento")?.valueChanges.subscribe(
          {
            next: (fecha) => {
              this.form.controls["edad"].setValue(this.calcularEdad(fecha));
            }
          }
        )
        this.form.get("nacionalidad")?.valueChanges.subscribe(
          {
            next: (nac) => {
              this.nacExtra$ = nac === "COL" ? of(false) : of(true)
              this.form.controls["lugar_nacimiento"].setValue("Extranjero");
            }
          }
        )
      }
      )
    }

  get today(){
    let date = new Date();
    date.setFullYear(date.getFullYear() - 16);
    return date.toISOString().split('T')[0];
  }

  createForm(){
    this.form = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      edad: ['', Validators.required],
      nacionalidad: [(this.paises.find((pais: any) => pais.valor === "COL") as any).valor , Validators.required],
      lugar_nacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
    });
  }

  calcularEdad(fecha: string): string {
    let today = new Date();
    let nacimiento = new Date(fecha);
    let edad =  today.getFullYear() - nacimiento.getFullYear();
    let month = today.getMonth() - nacimiento.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return `${edad}`;
  }
}
