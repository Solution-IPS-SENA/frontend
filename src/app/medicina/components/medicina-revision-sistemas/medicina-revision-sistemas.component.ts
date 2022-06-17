import { Component, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { delay, filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inAnexoValidator } from 'src/app/shared/validators/in-anexo.validator';

@Component({
  selector: 'app-medicina-revision-sistemas',
  templateUrl: './medicina-revision-sistemas.component.html',
  styleUrls: ['./medicina-revision-sistemas.component.css']
})
export class MedicinaRevisionSistemasComponent implements OnInit {

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

  referencia = [];

  loaded$ = of(false);

  inputs$?: Observable<InputDatos[]> = of([
    { id: "sis_derma", nombre: "Dermatológico", for: "sis_derma", options: this.referencia},
    { id: "sis_ost_musc", nombre: "Osteomuscular", for: "sis_ost_musc", options: this.referencia},
    { id: "sis_ost_arti", nombre: "Osteoarticular", for: "sis_ost_arti", options: this.referencia},
    { id: "sis_geni", nombre: "Genitourinario", for: "sis_geni", options: this.referencia},
    { id: "sis_meta", nombre: "Metabólico", for: "sis_meta", options: this.referencia},
    { id: "sis_neur", nombre: "Neurológico", for: "sis_neur", options: this.referencia},
    { id: "sis_carf", nombre: "Cardiorespiratorio", for: "sis_carf", options: this.referencia},
    { id: "sis_endo", nombre: "Endocrinológico", for: "sis_endo", options: this.referencia},
    { id: "sis_uro", nombre: "Urológico", for: "sis_uro", options: this.referencia},
    { id: "sis_gatro", nombre: "Gastrointestinal", for: "sis_gatro", options: this.referencia},
    { id: "sis_orl", nombre: "ORL", for: "sis_orl", options: this.referencia},
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
      sis_derma: [data ? data.sis_derma : this.referencia[0]["valor"] , [Validators.required, inAnexoValidator(this.referencia)]],
      sis_ost_musc: [data ? data.sis_ost_musc : this.referencia[0]["valor"] , [Validators.required, inAnexoValidator(this.referencia)]],
      sis_ost_arti: [data ? data.sis_ost_arti : this.referencia[0]["valor"] ,[Validators.required, inAnexoValidator(this.referencia)]],
      sis_geni: [data ? data.sis_geni : this.referencia[0]["valor"] ,[Validators.required, inAnexoValidator(this.referencia)]],
      sis_meta: [data ? data.sis_meta : this.referencia[0]["valor"] ,[Validators.required, inAnexoValidator(this.referencia)]],
      sis_neur: [data ? data.sis_neur : this.referencia[0]["valor"]],
      sis_carf: [data ? data.sis_carf : this.referencia[0]["valor"] ,[Validators.required, inAnexoValidator(this.referencia)]],
      sis_endo: [data ? data.sis_endo : this.referencia[0]["valor"] ,[Validators.required, inAnexoValidator(this.referencia)]],
      sis_uro: [data ? data.sis_uro : this.referencia[0]["valor"] ,[Validators.required, inAnexoValidator(this.referencia)]],
      sis_gatro: [data ? data.sis_gatro : this.referencia[0]["valor"] ,[Validators.required, inAnexoValidator(this.referencia)]],
      sis_orl: [data ? data.sis_orl : this.referencia[0]["valor"] ,[Validators.required, inAnexoValidator(this.referencia)]],
    });
  }

  ngOnInit(): void {
    let dataRecovery = localStorage.getItem("medicinaRevision");
    dataRecovery = dataRecovery ? JSON.parse(dataRecovery) : dataRecovery;

    this.currentPage = this.getCurrentPageUrl();
    this.obtenerAnexosService.getAnexos(["referencia"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.referencia = this.obtenerAnexosService.formatear_datos(response.referencia)

        this.inputs$ = of([
          { id: "sis_derma", nombre: "Dermatológico", for: "sis_derma", options: this.referencia},
          { id: "sis_ost_musc", nombre: "Osteomuscular", for: "sis_ost_musc", options: this.referencia},
          { id: "sis_ost_arti", nombre: "Osteoarticular", for: "sis_ost_arti", options: this.referencia},
          { id: "sis_geni", nombre: "Genitourinario", for: "sis_geni", options: this.referencia},
          { id: "sis_meta", nombre: "Metabólico", for: "sis_meta", options: this.referencia},
          { id: "sis_neur", nombre: "Neurológico", for: "sis_neur", options: this.referencia},
          { id: "sis_carf", nombre: "Cardiorespiratorio", for: "sis_carf", options: this.referencia},
          { id: "sis_endo", nombre: "Endocrinológico", for: "sis_endo", options: this.referencia},
          { id: "sis_uro", nombre: "Urológico", for: "sis_uro", options: this.referencia},
          { id: "sis_gatro", nombre: "Gastrointestinal", for: "sis_gatro", options: this.referencia},
          { id: "sis_orl", nombre: "ORL", for: "sis_orl", options: this.referencia},
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

  saveData(dataState: boolean){
    let data = this.form.value;
    localStorage.setItem("medicinaRevision", JSON.stringify(data));
  }

}
