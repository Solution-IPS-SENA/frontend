import { Component, OnInit, OnDestroy} from '@angular/core';
import { delay, filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { InputDatosDoble, InputDatos} from 'src/app/shared/interfaces/input-datos';
import { ObtenerAnexosService } from 'src/app/shared/services/obtener-anexos.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inAnexoValidator } from 'src/app/shared/validators/in-anexo.validator';

@Component({
  selector: 'app-certificaciones-remision',
  templateUrl: './certificaciones-remision.component.html',
  styleUrls: ['./certificaciones-remision.component.css']
})
export class CertificacionesRemisionComponent implements OnInit, OnDestroy {
  
  public currentPage = 0;
  form!: FormGroup;
  state: boolean = false;
  private lifecycleSubj: Subject<string> = new Subject<string>();

  areaSolicitante = [];
  remitidoA = [];
  loaded$ = of(false);

  inputs$?: Observable<InputDatos[]> = of([
    { id: "dni", nombre: "DNI", type: "text"},
    { id: "nombreRemision", nombre: "Nombre", type: "text" },
    { id: "empresa", nombre: "Empresa", type: "text"}
  ]);

  inputsCol2$?: Observable<InputDatos[]> = of([
    {id: "areaSolicitud", nombre: "Solicitud",for: "areaSolicitud", options: this.areaSolicitante}
  ]);

  inputsCol3$?: Observable<InputDatos[]> = of([
    {id: "remitido", nombre: "Remitido",for: "remitido", options: this.remitidoA}
  ]);

  inputsCol4$?: Observable<InputDatos[]> = of([
    { id: "registro", nombre: "Registro / TP", type: "text"},
    { id: "nombreFirma", nombre: "Nombre", type: "text" }
  ]);

  public get lifecycle$() {
    return this.lifecycleSubj.asObservable();
  }

  constructor(
    private obtenerAnexosService: ObtenerAnexosService,
    private router: Router,
    private fb: FormBuilder
    ) {}

    createForm(data?: any){   
      this.form = this.fb.group({
        areaSolicitud: [data ? data.areaSolicitud : this.areaSolicitante[0]["valor"], [Validators.required, inAnexoValidator(this.areaSolicitante)]],
        remitido: [data ? data.remitido : this.remitidoA[0]["valor"], [Validators.required, inAnexoValidator(this.remitidoA)]]
      });
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
    let dataRecovery = localStorage.getItem("certificacionesRemision");
    dataRecovery = dataRecovery ? JSON.parse(dataRecovery) : dataRecovery;

    this.obtenerAnexosService.getAnexos(["remitidoA","areaSolicitante"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        console.log(response);
        
        this.areaSolicitante = this.formatear_datos(response.areaSolicitante)
        this.remitidoA = this.formatear_datos(response.remitidoA)

        this.inputs$ = of([
          { id: "dni", nombre: "dni", type: "text"},
          { id: "nombreRemision", nombre: "nombre", type: "text" },
          { id: "empresa", nombre: "empresa", type: "text"}
])
        this.inputsCol2$ = of([
          {id: "areaSolicitud", nombre: "Solicitud",for: "areaSolicitud", options: this.areaSolicitante}
])
        this.inputsCol3$ = of([
          {id: "remitido", nombre: "Remitido",for: "remitido", options: this.remitidoA}
])
        this.inputsCol4$ = of([
          { id: "registro", nombre: "Registro / TP", type: "text"},
          { id: "nombreFirma", nombre: "Nombre", type: "text" }
])

        this.createForm(dataRecovery);
        this.loaded$ = of(true);
        this.state = this.form.valid
        this.form.valueChanges
        .pipe(
          takeUntil(this.lifecycle$.pipe(filter(state => state == "destroy")))
        )
        .subscribe(
          () => {
            this.state = this.form.valid
          }
        )
      }
    )
    this.lifecycleSubj.next("init");
  }
  ngOnDestroy(): void {
    this.lifecycleSubj.next("destroy");
    this.lifecycleSubj.complete();
  }

  saveData(){
    let data = this.form.value;
    localStorage.setItem("certificacionesRemision", JSON.stringify(data));
  }
}