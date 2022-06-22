import { Component, OnInit } from '@angular/core';
import { delay, filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inAnexoValidator } from 'src/app/shared/validators/in-anexo.validator'

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent implements OnInit {

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
