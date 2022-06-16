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
    { id: "dermatologico", nombre: "Dermatológico", for: "dermatologico", options: this.referencia},
    { id: "osteomuscular", nombre: "Osteomuscular", for: "osteomuscular", options: this.referencia},
    { id: "osteoarticular", nombre: "Osteoarticular", for: "osteoarticular", options: this.referencia},
    { id: "genitourinario", nombre: "Genitourinario", for: "genitourinario", options: this.referencia},
    { id: "metabolico", nombre: "Metabólico", for: "metabolico", options: this.referencia},
    { id: "neurologico", nombre: "Neurológico", for: "neurologico", options: this.referencia},
    { id: "cardiorespiratorio", nombre: "Cardiorespiratorio", for: "cardiorespiratorio", options: this.referencia},
    { id: "endocrinologico", nombre: "Endocrinológico", for: "endocrinologico", options: this.referencia},
    { id: "urologico", nombre: "Urológico", for: "urologico", options: this.referencia},
    { id: "gastrointestinal", nombre: "Gastrointestinal", for: "gastrointestinal", options: this.referencia},
    { id: "orl", nombre: "ORL", for: "orl", options: this.referencia},
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
      dermatologico: [data ? data.dermatologico : this.referencia[0]["valor"] , [Validators.required, inAnexoValidator(this.referencia)]],
      osteomuscular: [data ? data.osteomuscular : this.referencia[0]["valor"] , [Validators.required, inAnexoValidator(this.referencia)]],
      osteoarticular: [data ? data.osteoarticular : this.referencia[0]["valor"] ,[Validators.required, inAnexoValidator(this.referencia)]],
      genitourinario: [data ? data.genitourinario : this.referencia[0]["valor"] ,[Validators.required, inAnexoValidator(this.referencia)]],
      metabolico: [data ? data.metabolico : this.referencia[0]["valor"] ,[Validators.required, inAnexoValidator(this.referencia)]],
      neurologico: [data ? data.neurologico : this.referencia[0]["valor"]],
      cardiorespiratorio: [data ? data.cardiorespiratorio : this.referencia[0]["valor"] ,[Validators.required, inAnexoValidator(this.referencia)]],
      endocrinologico: [data ? data.endocrinologico : this.referencia[0]["valor"] ,[Validators.required, inAnexoValidator(this.referencia)]],
      urologico: [data ? data.urologico : this.referencia[0]["valor"] ,[Validators.required, inAnexoValidator(this.referencia)]],
      psiquiatrico: [data ? data.psiquiatrico : this.referencia[0]["valor"] ,[Validators.required, inAnexoValidator(this.referencia)]],
      gastrointestinal: [data ? data.gastrointestinal : this.referencia[0]["valor"] ,[Validators.required, inAnexoValidator(this.referencia)]],
      orl: [data ? data.orl : this.referencia[0]["valor"] ,[Validators.required, inAnexoValidator(this.referencia)]],
      observacionesRevisionMedicina: [data ? data.observacionesRevisionMedicina : ''],
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
          { id: "dermatologico", nombre: "Dermatológico", for: "dermatologico", options: this.referencia},
          { id: "osteomuscular", nombre: "Osteomuscular", for: "osteomuscular", options: this.referencia},
          { id: "osteoarticular", nombre: "Osteoarticular", for: "osteoarticular", options: this.referencia},
          { id: "genitourinario", nombre: "Genitourinario", for: "genitourinario", options: this.referencia},
          { id: "metabolico", nombre: "Metabólico", for: "metabolico", options: this.referencia},
          { id: "neurologico", nombre: "Neurológico", for: "neurologico", options: this.referencia},
          { id: "cardiorespiratorio", nombre: "Cardiorespiratorio", for: "cardiorespiratorio", options: this.referencia},
          { id: "endocrinologico", nombre: "Endocrinológico", for: "endocrinologico", options: this.referencia},
          { id: "urologico", nombre: "Urológico", for: "urologico", options: this.referencia},
          { id: "psiquiatrico", nombre: "Psiquiátrico", for: "psiquiatrico", options: this.referencia},
          { id: "gastrointestinal", nombre: "Gastrointestinal", for: "gastrointestinal", options: this.referencia},
          { id: "orl", nombre: "ORL", for: "orl", options: this.referencia},
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
