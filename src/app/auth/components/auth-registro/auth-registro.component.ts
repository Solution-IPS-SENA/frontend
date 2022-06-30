import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { SharedDatosOcupacionalesComponent } from 'src/app/shared/components/shared-datos-ocupacionales/shared-datos-ocupacionales.component';
import { SharedDatosPersonalesComponent } from 'src/app/shared/components/shared-datos-personales/shared-datos-personales.component';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { ClientService } from 'src/app/shared/services/client.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { ObtenerAnexosService } from 'src/app/shared/services/obtener-anexos.service';
import { environment } from 'src/environments/environment';

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

  @ViewChild(SharedDatosPersonalesComponent) public datosPersonales?: SharedDatosPersonalesComponent;
  @ViewChild(SharedDatosOcupacionalesComponent) public datosOcupacionales?: SharedDatosOcupacionalesComponent;

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

  ngOnInit(): void {
    this.obtenerAnexosService.getAnexos(["tipoDocumento","rol"]).subscribe(
      (response: InformacionAnexos) => {
        this.tipoDocumento = this.obtenerAnexosService.formatear_datos(response.tipoDocumento, "abreviacion", "completo")

        this.inputDoc$ = of([
          { id:"tipo_documento", for:"tipo_documento", options: this.tipoDocumento },
          { id: "documento", nombre: "Documento", type: "text", for: "documento" }
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

  saveData(){
    let valid = this.datosOcupacionales!.form.valid && this.datosPersonales!.form.valid && this.form.valid;
    let personales = this.datosPersonales!.form.value;
    let ocupacionales = this.datosOcupacionales!.form.value;
    if(valid){
      let data = {
        ...personales,
        ...ocupacionales,
        ...this.form.value
      };
      delete data.edad;
      let url = environment.URLS.AUTH + environment.ENDPOINTS.REGISTER;
      this.client.post(url, data).subscribe(
        {
          next: () => {
            this.messages.success("El paciente se ha registrado");
          },
          error: (err) => {
            console.log(err);
          }
        }
      )
    }
    else{
      this.messages.error("El formulario está incompleto");
    }
  }
}
