import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputDatosType } from 'src/app/shared/interfaces/input-datos';
import { delay, filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inAnexoValidator } from 'src/app/shared/validators/in-anexo.validator';

@Component({
  selector: 'app-medicina-antecedentes-2',
  templateUrl: './medicina-antecedentes-2.component.html',
  styleUrls: ['./medicina-antecedentes-2.component.css']
})
export class MedicinaAntecedentes2Component implements OnInit, OnDestroy {

  public currentPage = 0;
  form!: FormGroup;
  state: boolean = false;
  private lifecycleSubj: Subject<string> = new Subject<string>();

  public onPageChange(currentPage: number) {
    this.router.navigate(['/historias', 'medicina', currentPage]).then(() => {
      this.currentPage = this.getCurrentPageUrl();
    });
  }

  public getCurrentPageUrl(): number {
    const urlSegments = this.router.url.split('/');
    return parseInt(urlSegments[urlSegments.length - 1] ?? '0');
  }

  sino = [];
  normalidad = [];

  loaded$ = of(false);

  inputs$?: Observable<InputDatosType[]> = of([
    { id: "fupFecha", nombre: "FUP (Fecha)", for: "fupFecha", type: "date" },
    { id: "fumFecha", nombre: "FUM (Fecha)", for: "fumFecha", type: "date"},
    { id: "planifica", nombre: "Planifica", for: "planifica", type: "select", options: this.sino},
    { id: "dismenorrea", nombre: "Dismenorrea", for: "dismenorrea", type: "select", options: this.sino},
    { id: "dispareunia", nombre: "Dispareunia", for: "dispareunia", type: "select", options: this.sino},
    { id: "ecoMamaria", nombre: "Eco - Mamaria", for: "ecoMamaria", type: "date"},
    { id: "cicloMenstrual", nombre: "Ciclo menstrual", for: "cicloMenstrual", type: "select", options: this.normalidad},
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
      fupFecha: [data ? data.fupFecha : '' , Validators.required],
      fumFecha: [data ? data.fumFecha : '' , Validators.required],
      planifica: [data ? data.planifica : this.sino[0]["valor"] ,[Validators.required, inAnexoValidator(this.sino)]],
      dismenorrea: [data ? data.dismenorrea : this.sino[0]["valor"] ,[Validators.required, inAnexoValidator(this.sino)]],
      dispareunia: [data ? data.dispareunia : this.sino[0]["valor"] ,[Validators.required, inAnexoValidator(this.sino)]],
      ecoMamaria: [data ? data.ecoMamaria : '', Validators.required],
      cicloMenstrual: [data ? data.cicloMenstrual : this.normalidad[0]["valor"], [Validators.required, inAnexoValidator(this.normalidad)]],
      observacionesAntecedentes2Medicina: [data ? data.observacionesAntecedentes2Medicina : ''],
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
    let dataRecovery = localStorage.getItem("medicinaAntecedentes2");
    dataRecovery = dataRecovery ? JSON.parse(dataRecovery) : dataRecovery;

    this.currentPage = this.getCurrentPageUrl();
    this.obtenerAnexosService.getAnexos(["sino","normalidad"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.sino = this.formatear_datos(response.sino)
        this.normalidad = this.formatear_datos(response.normalidad)

        this.inputs$ = of([
          { id: "fupFecha", nombre: "FUP (Fecha)", for: "fupFecha", type: "date" },
          { id: "fumFecha", nombre: "FUM (Fecha)", for: "fumFecha", type: "date"},
          { id: "planifica", nombre: "Planifica", for: "planifica", type: "select", options: this.sino},
          { id: "dismenorrea", nombre: "Dismenorrea", for: "dismenorrea", type: "select", options: this.sino},
          { id: "dispareunia", nombre: "Dispareunia", for: "dispareunia", type: "select", options: this.sino},
          { id: "ecoMamaria", nombre: "Eco - Mamaria", for: "ecoMamaria", type: "date"},
          { id: "cicloMenstrual", nombre: "Ciclo menstrual", for: "cicloMenstrual", type: "select", options: this.normalidad},
        ])

        this.loaded$ = of(true);
        this.createForm(dataRecovery);
        this.state = this.form.valid;
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
    localStorage.setItem("medicinaAntecedentes2", JSON.stringify(data));
  }
}
