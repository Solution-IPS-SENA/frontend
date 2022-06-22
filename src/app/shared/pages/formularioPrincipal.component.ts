import { Component, Input, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { delay, Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { SharedDatosOcupacionalesComponent } from "../components/shared-datos-ocupacionales/shared-datos-ocupacionales.component";
import { SharedDatosPersonalesComponent } from "../components/shared-datos-personales/shared-datos-personales.component";
import { SharedObservacionesComponent } from "../components/shared-observaciones/shared-observaciones.component";
import { DatosHistoria } from "../interfaces/datos-historia";
import { InformacionAnexos } from "../interfaces/informacion-anexos";
import { InputDatos } from "../interfaces/input-datos";
import { ClientService } from "../services/client.service";
import { MessagesService } from "../services/messages.service";
import { ObtenerAnexosService } from "../services/obtener-anexos.service";

@Component({
    selector: 'formularioPrincipal',
    templateUrl: './formularioPrincipal.html',
})
export class formularioPrincipalComponent {

  @Input()
  form!: FormGroup;

  tipoDocumento = [];

  input$?: Observable<InputDatos> = of(
    { options: this.tipoDocumento },
  );

  loaded$: Observable<boolean> = of(false);
  historia!: DatosHistoria ;

  constructor(
    private obtenerAnexosService: ObtenerAnexosService,
    private fb: FormBuilder,
    private client: ClientService,
    private messages: MessagesService
    ){}

  ngOnInit(): void {
    this.obtenerAnexosService.getAnexos(["tipoDocumento"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.tipoDocumento = this.obtenerAnexosService.formatear_datos(response.tipoDocumento, "abreviacion", "completo")

        this.input$ = of({ options: this.tipoDocumento })
        this.form = this.fb.group({
          tipo_documento: [this.tipoDocumento[0]["valor"], Validators.required],
          documento: ['', Validators.required],
        });
        this.loaded$ = of(true);
      }
    )
  }

  saveData(){
    let data = this.form.value;
    localStorage.setItem("documento", JSON.stringify(data));

    if (data){
      this.client.post(environment.URLS.AUTH + environment.ENDPOINTS.QUERY_PACIENTE, data)
      .subscribe(
        {
          next: (res: any) => {
            this.historia = res['response'];
            this.alerta(this.historia)
          },
          error: (err) => {
            console.log(err.status, err.error.response)
            this.messages.error(err.error.response)
          }
        }
      )
    }else {
      console.log("Form error");
    }
  }

  onSubmit() {
    if(this.form.valid){
      console.log(this.form.value)
    }
    else{
      console.log("No");

    }
  }

  @ViewChild(SharedDatosPersonalesComponent) public sharedPersonales?: SharedDatosPersonalesComponent;
  @ViewChild(SharedDatosOcupacionalesComponent) public sharedOcupacionales?: SharedDatosOcupacionalesComponent;
  @ViewChild(SharedObservacionesComponent) public sharedObservaciones?: SharedObservacionesComponent;

  alerta(his: DatosHistoria){
    this.sharedPersonales?.form.patchValue({nombres: his.nombres});
    this.sharedPersonales?.form.patchValue({apellidos: his.apellidos});
    this.sharedPersonales?.form.patchValue({fecha_nacimiento: his.fecha_nacimiento});
    this.sharedPersonales?.form.patchValue({edad: this.calcularEdad(his.fecha_nacimiento)});
    this.sharedPersonales?.form.patchValue({nacionalidad: his.nacionalidad});
    this.sharedPersonales?.form.patchValue({lugar_nacimiento: his.lugar_nacimiento});
    this.sharedPersonales?.form.patchValue({genero: this.recuperarGenero(his.genero)});
    this.sharedPersonales?.form.patchValue({direccion: his.direccion});
    this.sharedPersonales?.form.patchValue({telefono: his.telefono});
    this.sharedOcupacionales?.form.patchValue({empresa: his.empresa});
    this.sharedOcupacionales?.form.patchValue({cargo: his.cargo});
    this.sharedOcupacionales?.form.patchValue({fecha_ingreso: his.fecha_ingreso});
    this.sharedOcupacionales?.form.patchValue({tiempo_cargo: his.tiempo_cargo});
    this.sharedOcupacionales?.form.patchValue({arl: his.arl});
    this.sharedOcupacionales?.form.patchValue({eps: his.eps});
    this.sharedOcupacionales?.form.patchValue({afp: his.afp});
    this.sharedOcupacionales?.form.patchValue({correo: his.correo});
    this.sharedOcupacionales?.form.patchValue({telefono_empresa: his.telefono_empresa});
  }

  recuperarGenero(genero: string){
    if(genero == 'M'){
      return 'MASCULINO'
    } else {
      if(genero == 'F'){
        return 'FEMENINO'
      }
    }
    return 'OTRO'
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
