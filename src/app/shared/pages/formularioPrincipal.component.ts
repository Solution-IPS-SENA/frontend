import { Component, Input, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { delay, Observable, of } from "rxjs";
import { SharedDatosOcupacionalesComponent } from "../components/shared-datos-ocupacionales/shared-datos-ocupacionales.component";
import { SharedDatosPersonalesComponent } from "../components/shared-datos-personales/shared-datos-personales.component";
import { SharedObservacionesComponent } from "../components/shared-observaciones/shared-observaciones.component";
import { InformacionAnexos } from "../interfaces/informacion-anexos";
import { InputDatosType } from "../interfaces/input-datos";
import { ObtenerAnexosService } from "../services/obtener-anexos.service";

@Component({
    selector: 'formularioPrincipal',
    templateUrl: './formularioPrincipal.html',
})
export class formularioPrincipalComponent {

  @Input()
  form!: FormGroup;

  tipoDeDocumento = [];

  input$?: Observable<InputDatosType> = of(
    { options: this.tipoDeDocumento },
  );

  loaded$: Observable<boolean> = of(false);

  constructor(
    private obtenerAnexosService: ObtenerAnexosService,
    private fb: FormBuilder
    ){}

  ngOnInit(): void {

    this.obtenerAnexosService.getAnexos(["tipoDeDocumento"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.tipoDeDocumento = this.formatear_datos(response.tipoDeDocumento)
        this.input$ = of({ options: this.tipoDeDocumento })
        console.log(this.tipoDeDocumento);
        this.form = this.fb.group({
          tipo_documento: [this.tipoDeDocumento[0]["valor"], Validators.required],
          documento: ['', Validators.required]
        });
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


