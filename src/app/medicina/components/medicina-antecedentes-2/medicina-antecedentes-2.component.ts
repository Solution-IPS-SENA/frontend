import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
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

  inputs$?: Observable<InputDatos[]> = of([
    { id: "ant_per_gin_fup", nombre: "FUP (Fecha)", for: "ant_per_gin_fup", type: "date" },
    { id: "ant_per_gin_fum", nombre: "FUM (Fecha)", for: "ant_per_gin_fum", type: "date"},
    { id: "ant_per_gin_plan", nombre: "Planifica", for: "ant_per_gin_plan", type: "select", options: this.sino},
    { id: "ant_per_gin_dism", nombre: "Dismenorrea", for: "ant_per_gin_dism", type: "select", options: this.sino},
    { id: "ant_per_gin_disp", nombre: "Dispareunia", for: "ant_per_gin_disp", type: "select", options: this.sino},
    { id: "ant_per_gin_mam", nombre: "Eco - Mamaria", for: "ant_per_gin_mam", type: "date"},
    { id: "ant_per_gin_mens", nombre: "Ciclo menstrual", for: "ant_per_gin_mens", type: "select", options: this.normalidad},
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
      ant_per_gin_fup: [data ? data.ant_per_gin_fup : '' , Validators.required],
      ant_per_gin_fum: [data ? data.ant_per_gin_fum : '' , Validators.required],
      ant_per_gin_plan: [data ? data.ant_per_gin_plan : this.sino[0]["valor"] ,[Validators.required, inAnexoValidator(this.sino)]],
      ant_per_gin_dism: [data ? data.ant_per_gin_dism : this.sino[0]["valor"] ,[Validators.required, inAnexoValidator(this.sino)]],
      ant_per_gin_disp: [data ? data.ant_per_gin_disp : this.sino[0]["valor"] ,[Validators.required, inAnexoValidator(this.sino)]],
      ant_per_gin_mam: [data ? data.ant_per_gin_mam : '', Validators.required],
      ant_per_gin_mens: [data ? data.ant_per_gin_mens : this.normalidad[0]["valor"], [Validators.required, inAnexoValidator(this.normalidad)]],
      ant_per_obs2: [data ? data.ant_per_obs2 : ''],
    });
  }

  ngOnInit(): void {
    let dataRecovery = localStorage.getItem("medicinaAntecedentes2");
    dataRecovery = dataRecovery ? JSON.parse(dataRecovery) : dataRecovery;

    this.currentPage = this.getCurrentPageUrl();
    this.obtenerAnexosService.getAnexos(["sino","normalidad"]).subscribe(
      (response: InformacionAnexos) => {
        this.sino = this.obtenerAnexosService.formatear_datos(response.sino)
        this.normalidad = this.obtenerAnexosService.formatear_datos(response.normalidad)

        this.inputs$ = of([
          { id: "ant_per_gin_fup", nombre: "FUP (Fecha)", for: "ant_per_gin_fup", type: "date" },
          { id: "ant_per_gin_fum", nombre: "FUM (Fecha)", for: "ant_per_gin_fum", type: "date"},
          { id: "ant_per_gin_plan", nombre: "Planifica", for: "ant_per_gin_plan", type: "select", options: this.sino},
          { id: "ant_per_gin_dism", nombre: "Dismenorrea", for: "ant_per_gin_dism", type: "select", options: this.sino},
          { id: "ant_per_gin_disp", nombre: "Dispareunia", for: "ant_per_gin_disp", type: "select", options: this.sino},
          { id: "ant_per_gin_mam", nombre: "Eco - Mamaria", for: "ant_per_gin_mam", type: "date"},
          { id: "ant_per_gin_mens", nombre: "Ciclo menstrual", for: "ant_per_gin_mens", type: "select", options: this.normalidad},
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
