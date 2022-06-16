import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inAnexoValidator } from 'src/app/shared/validators/in-anexo.validator';

@Component({
  selector: 'app-certificaciones-aptitud-ocupacional',
  templateUrl: './certificaciones-aptitud-ocupacional.component.html',
  styleUrls: ['./certificaciones-aptitud-ocupacional.component.css']
})
export class CertificacionesAptitudOcupacionalComponent implements OnInit, OnDestroy {

  public currentPage = 0;
  form!: FormGroup;
  state: boolean = false;
  private lifecycleSubj: Subject<string> = new Subject<string>();
  
  conceptoF = [];
  recomendacionesF = [];
  loaded$ = of(false);

  inputs$?: Observable<InputDatos[]> = of([
    { id: "dni1", nombre: "DNI", type: "text"},
    { id: "nombre1", nombre: "Nombre", type: "text" },
    { id: "empresa1", nombre: "Empresa", type: "text"}
  ]);

  inputsCol1$?: Observable<InputDatos[]> = of([
    { id: "optometria", nombre: "Optometria", type: "text"},
    { id: "psicologia", nombre: "Psicologia", type: "text"},
    { id: "laboratorio", nombre: "Laboratorio", type: "text"},
    { id: "medicina", nombre: "Medicina", type: "text" }
  ]);

  inputsCol2$?: Observable<InputDatos[]> = of([
    {  id: "centi_concep_opto",nombre: "Concepto Optometría",for: "centi_concep_opto", options: this.conceptoF},
    {  id: "centi_concep_psico",nombre: "Concepto Psicología",for: "centi_concep_psico", options: this.conceptoF},
    {  id: "centi_concep_labo",nombre: "Concepto Laboratorio",for: "centi_concep_labo", options: this.conceptoF},
    {  id: "centi_concep_medi",nombre: "Concepto Medicina",for: "centi_concep_medi", options: this.conceptoF}
  ]);

  inputsCol3$?: Observable<InputDatos[]> = of([
    { id: "protecciónoptometria",nombre: "Protección Optometría",for: "protecciónoptometria", options: this.recomendacionesF},
    { id: "protecciónpsicologia",nombre: "Protección Psicología",for: "protecciónpsicologia", options: this.recomendacionesF },
    { id: "protecciónlaboratorio",nombre: "Protección Laboratorio",for: "protecciónlaboratorio", options: this.recomendacionesF},
    { id: "protecciónmedicina",nombre: "Protección Medicina",for: "protecciónmedicina", options: this.recomendacionesF}
  ]);

  inputsCol4$?: Observable<InputDatos[]> = of([
    { id: "dniFirma", nombre: "DNI", type: "text"},
    { id: "nombreFirma", nombre: "Nombre", type: "text" }
  ]);

  inputsCol5$?: Observable<InputDatos[]> = of([
    { id: "registro", nombre: "Registro / TP", type: "text"},
    { id: "nombreFirma2", nombre: "Nombre", type: "text" }
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
        centi_concep_opto: [data ? data.centi_concep_opto : this.conceptoF[0]["valor"], [Validators.required, inAnexoValidator(this.conceptoF)]],
        centi_concep_psico: [data ? data.centi_concep_psico : this.conceptoF[0]["valor"], [Validators.required, inAnexoValidator(this.conceptoF)]],
        centi_concep_labo: [data ? data.centi_concep_labo : this.conceptoF[0]["valor"] ,[Validators.required, inAnexoValidator(this.conceptoF)]],
        centi_concep_medi: [data ? data.centi_concep_medi : this.conceptoF[0]["valor"] ,[Validators.required, inAnexoValidator(this.conceptoF)]],
        protecciónoptometria: [data ? data.protecciónoptometria : this.recomendacionesF[0]["valor"], [Validators.required, inAnexoValidator(this.recomendacionesF)]],
        protecciónpsicologia: [data ? data.protecciónpsicologia : this.recomendacionesF[0]["valor"], [Validators.required, inAnexoValidator(this.recomendacionesF)]],
        protecciónlaboratorio: [data ? data.protecciónlaboratorio : this.recomendacionesF[0]["valor"] ,[Validators.required, inAnexoValidator(this.recomendacionesF)]],
        protecciónmedicina: [data ? data.protecciónmedicina : this.recomendacionesF[0]["valor"] ,[Validators.required, inAnexoValidator(this.recomendacionesF)]]
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
    let dataRecovery = localStorage.getItem("certificacionesOcupacionales");
    dataRecovery = dataRecovery ? JSON.parse(dataRecovery) : dataRecovery;

    this.obtenerAnexosService.getAnexos(["conceptoF","recomendacionesF"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.conceptoF = this.formatear_datos(response.conceptoF)
        this.recomendacionesF = this.formatear_datos(response.recomendacionesF)
        this.inputs$ = of([
          { id: "dniCertificadoOcu", nombre: "dni", type: "text"},
          { id: "nombreCertificadoOcu", nombre: "nombre", type: "text" },
          { id: "empresaCertificadoOcu", nombre: "empresa", type: "text"}
  ])

        this.inputsCol1$ = of([
          { id: "optometria", nombre: "Optometria", type: "text"},
          { id: "psicologia", nombre: "Psicologia", type: "text"},
          { id: "laboratorio", nombre: "Laboratorio", type: "text"},
          { id: "medicina", nombre: "Medicina", type: "text" }
  ])

        this.inputsCol2$ = of([
          {  id: "centi_concep_opto",nombre: "Concepto Optometría",for: "centi_concep_opto", options: this.conceptoF},
          {  id: "centi_concep_psico",nombre: "Concepto Psicología",for: "centi_concep_psico", options: this.conceptoF},
          {  id: "centi_concep_labo",nombre: "Concepto Laboratorio",for: "centi_concep_labo", options: this.conceptoF},
          {  id: "centi_concep_medi",nombre: "Concepto Medicina",for: "centi_concep_medi", options: this.conceptoF}
  ])

        this.inputsCol3$ = of([
          { id: "protecciónoptometria",nombre: "Protección Optometría",for: "protecciónoptometria", options: this.recomendacionesF},
          { id: "protecciónpsicologia",nombre: "Protección Psicología",for: "protecciónpsicologia", options: this.recomendacionesF },
          { id: "protecciónlaboratorio",nombre: "Protección Laboratorio",for: "protecciónlaboratorio", options: this.recomendacionesF},
          { id: "protecciónmedicina",nombre: "Protección Medicina",for: "protecciónmedicina", options: this.recomendacionesF}
  ])

        this.inputsCol4$ = of([
          { id: "dniFirma", nombre: "DNI", type: "text"},
          { id: "nombreFirma", nombre: "Nombre", type: "text" }
  ])


        this.inputsCol5$ = of([
          { id: "registro", nombre: "Registro / TP", type: "text"},
          { id: "nombreFirma2", nombre: "Nombre", type: "text" }
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
    localStorage.setItem("certificacionesOcupacionales", JSON.stringify(data));
  }
}