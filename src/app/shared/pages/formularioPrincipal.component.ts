import { Component, Input, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { delay, Observable, of } from "rxjs";
import { SharedDatosOcupacionalesComponent } from "../components/shared-datos-ocupacionales/shared-datos-ocupacionales.component";
import { SharedDatosPersonalesComponent } from "../components/shared-datos-personales/shared-datos-personales.component";
import { SharedObservacionesComponent } from "../components/shared-observaciones/shared-observaciones.component";
import { InformacionAnexos } from "../interfaces/informacion-anexos";
import { InputDatos } from "../interfaces/input-datos";
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

  constructor(
    private obtenerAnexosService: ObtenerAnexosService,
    private fb: FormBuilder
    ){}

  ngOnInit(): void {

    this.obtenerAnexosService.getAnexos(["tipoDocumento"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.tipoDocumento = this.obtenerAnexosService.formatear_datos(response.tipoDocumento, "abreviacion", "completo")
        console.log(this.tipoDocumento);

        this.input$ = of({ options: this.tipoDocumento })
        this.form = this.fb.group({
          tipo_documento: [this.tipoDocumento[0]["valor"], Validators.required],
          documento: ['', Validators.required]
        });
        this.loaded$ = of(true);
      }
    )
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

  alerta(){
    console.warn(this.sharedPersonales?.form.patchValue({nombres: "hola"}));
    console.warn(this.sharedPersonales?.form.patchValue({apellidos: "como estas"}));
    console.warn(this.sharedPersonales?.form.patchValue({fechaNacimiento: "hola"}));
    console.warn(this.sharedPersonales?.form.patchValue({edad: "como estas"}));
    console.warn(this.sharedPersonales?.form.patchValue({nacionalidad: "hola"}));
    console.warn(this.sharedPersonales?.form.patchValue({lugarNacimiento: "como estas"}));
    console.warn(this.sharedPersonales?.form.patchValue({genero: "hola"}));
    console.warn(this.sharedPersonales?.form.patchValue({direccion: "como estas"}));
    console.warn(this.sharedPersonales?.form.patchValue({telefono: "hola"}));


    console.warn(this.sharedPersonales?.form.patchValue({apellidos: "como estas"}));
    console.warn(this.sharedPersonales?.form.patchValue({nombres: "hola"}));
    console.warn(this.sharedPersonales?.form.patchValue({apellidos: "como estas"}));
    console.warn(this.sharedPersonales?.form.patchValue({nombres: "hola"}));
    console.warn(this.sharedPersonales?.form.patchValue({apellidos: "como estas"}));
    console.warn(this.sharedPersonales?.form.patchValue({nombres: "hola"}));
    console.warn(this.sharedPersonales?.form.patchValue({apellidos: "como estas"}));
    console.warn(this.sharedPersonales?.form.patchValue({nombres: "hola"}));
    console.warn(this.sharedPersonales?.form.patchValue({apellidos: "como estas"}));
    console.warn(this.sharedPersonales?.form.patchValue({nombres: "hola"}));
    console.warn(this.sharedPersonales?.form.patchValue({apellidos: "como estas"}));
    console.warn(this.sharedPersonales?.form.patchValue({nombres: "hola"}));
    console.warn(this.sharedPersonales?.form.patchValue({apellidos: "como estas"}));
    console.warn(this.sharedPersonales?.form.patchValue({nombres: "hola"}));
    console.warn(this.sharedPersonales?.form.patchValue({apellidos: "como estas"}));
    console.warn(this.sharedPersonales?.form.patchValue({nombres: "hola"}));
    console.warn(this.sharedPersonales?.form.patchValue({apellidos: "como estas"}));
    console.warn(this.sharedPersonales?.form.patchValue({nombres: "hola"}));
    console.warn(this.sharedPersonales?.form.patchValue({apellidos: "como estas"}));
    console.warn(this.sharedPersonales?.form.patchValue({nombres: "hola"}));
    console.warn(this.sharedPersonales?.form.patchValue({apellidos: "como estas"}));
  }
}
