import { Component, Input, OnInit} from '@angular/core';
import { InputDatos } from '../../interfaces/input-datos';
import { Observable, of } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shared-datos-ocupacionales',
  templateUrl: './shared-datos-ocupacionales.component.html',
  styleUrls: ['./shared-datos-ocupacionales.component.css']
})
export class SharedDatosOcupacionalesComponent implements OnInit {

  @Input()
  eps = [];
  afp = [];
  arl = [];
  form!: FormGroup;
  loaded$ = of(false);

  inputs$?: Observable<InputDatos[]> = of([
    { id: "empresa", nombre: "Empresa", type: "text", for: "empresa" },
    { id: "cargo", nombre: "Cargo", type: "text", for: "cargo" },
    { id: "fecha_ingreso", nombre: "Fecha de Ingreso", type: "date", for: "fecha_ingreso" },
    { id: "tiempo_cargo", nombre: "Tiempo en Cargo", type: "text", for: "tiempo_cargo" },
    { id: "arl", nombre: "ARL", type: "select", for: "arl", options: this.arl},
    { id: "eps", nombre: "EPS", type: "select", for: "eps" , options: this.eps},
    { id: "afp", nombre: "AFP", type: "select", for: "afp" , options: this.afp},
    { id: "correo", nombre: "Correo", type: "text", for: "correo" },
    { id: "telefono_empresa", nombre: "Teléfono laboral", type: "text", for: "telefono_empresa" },
  ]);

  constructor(
    private obtenerAnexosService: ObtenerAnexosService,
    private fb: FormBuilder
  ){}


  ngOnInit(): void {
    this.obtenerAnexosService.getAnexos(["eps","afp","arl"]).subscribe(
      (response: InformacionAnexos) => {
        this.eps = this.obtenerAnexosService.formatear_datos(response.eps)
        this.afp = this.obtenerAnexosService.formatear_datos(response.afp)
        this.arl = this.obtenerAnexosService.formatear_datos(response.arl)

        this.inputs$ = of([
          { id: "empresa", nombre: "Empresa", type: "text", for: "empresa" },
          { id: "cargo", nombre: "Cargo", type: "text", for: "cargo" },
          { id: "fecha_ingreso", nombre: "Fecha de Ingreso", type: "date", for: "fecha_ingreso" },
          { id: "tiempo_cargo", nombre: "Tiempo en Cargo", type: "text", for: "tiempo_cargo" },
          { id: "arl", nombre: "ARL", type: "select", for: "arl", options: this.arl},
          { id: "eps", nombre: "EPS", type: "select", for: "eps" , options: this.eps},
          { id: "afp", nombre: "AFP", type: "select", for: "afp" , options: this.afp},
          { id: "correo", nombre: "Correo", type: "text", for: "correo" },
          { id: "telefono_empresa", nombre: "Teléfono laboral", type: "text", for: "telefono_empresa" },
        ])
        this.createForm()
        this.loaded$ = of(true);
        let datos: any = localStorage.getItem("datos_paciente");
        if(datos){
          this.form.patchValue(JSON.parse(datos!));
        }
      }
    )
  }

  createForm(){
    this.form = this.fb.group({
      empresa: ['', Validators.required],
      cargo: ['', Validators.required],
      fecha_ingreso: ['', Validators.required],
      tiempo_cargo: ['', Validators.required],
      arl: [this.arl[0]["valor"] , Validators.required],
      eps: [this.eps[0]["valor"], Validators.required],
      afp: [this.afp[0]["valor"], Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono_empresa: ['', Validators.required],
    });
  }
}
