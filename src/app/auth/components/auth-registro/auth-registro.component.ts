import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, Observable, of } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { ClientService } from 'src/app/shared/services/client.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { ObtenerAnexosService } from 'src/app/shared/services/obtener-anexos.service';

@Component({
  selector: 'app-auth-registro',
  templateUrl: './auth-registro.component.html',
  styleUrls: ['./auth-registro.component.css']
})
export class AuthRegistroComponent implements OnInit {

  tipoDocumento = [];
  rol = [];

  form!: FormGroup;

  loaded$: Observable<boolean> = of(false);

  constructor(
    private obtenerAnexosService: ObtenerAnexosService,
    private fb: FormBuilder,
    private client: ClientService,
    private messages: MessagesService
  ){}

  inputDoc$?: Observable<InputDatos[]> = of([
    { id: "documento", nombre: "Documento", type: "text", for: "documento" },
    { id:"tipo_documento", for:"tipo_documento", options: this.tipoDocumento },
  ]);

  inputs$?:Observable<InputDatos[]> = of([
    { id: "salario", nombre: "Fecha de Ingreso", type: "date", for: "salario" }
  ]);

  inputsEmpresa$?: Observable<InputDatos[]> = of([
    { id: "rethus", nombre: "rethus", type: "text", for: "rethus" },
    { id: "rol", nombre: "rol", type: "text", for: "rol", options: this.rol },
    { id: "salario", nombre: "Fecha de Ingreso", type: "date", for: "salario" },
    { id: "secretaria_salud", nombre: "Tiempo en Cargo", type: "text", for: "secretaria_salud" },
    { id: "tp", nombre: "tp", type: "select", for: "tp"},
  ]);

  ngOnInit(): void {
    this.obtenerAnexosService.getAnexos(["tipoDocumento","rol"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.tipoDocumento = this.obtenerAnexosService.formatear_datos(response.tipoDocumento, "abreviacion", "completo")
        this.rol = this.obtenerAnexosService.formatear_datos(response.rol)

        this.inputDoc$ = of([
          { id: "documento", nombre: "Documento", type: "text", for: "documento" },
          { id:"tipoDoc", for:"tipoDoc", options: this.tipoDocumento }
        ])

        this.inputs$ = of([
          { id: "salario", nombre: "Fecha de Ingreso", type: "date", for: "salario" }
        ])

        this.inputsEmpresa$ = of([
          { id: "rethus", nombre: "rethus", type: "text", for: "rethus" },
          { id: "rol", nombre: "rol", type: "text", for: "rol", options: this.rol },
          { id: "salario", nombre: "Fecha de Ingreso", type: "date", for: "salario" },
          { id: "secretaria_salud", nombre: "Tiempo en Cargo", type: "text", for: "secretaria_salud" },
          { id: "tp", nombre: "tp", type: "select", for: "tp"}
        ])
        
        this.createForm()
        this.loaded$ = of(true);
      }
    )
  }

  createForm() {
    this.form = this.fb.group({
      tipo_documento: [this.tipoDocumento[0]["valor"], Validators.required],
      documento: ['', Validators.required],
    });
  }
}
