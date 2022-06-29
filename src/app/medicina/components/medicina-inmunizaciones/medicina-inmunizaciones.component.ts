import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { delay, filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inAnexoValidator } from 'src/app/shared/validators/in-anexo.validator';

@Component({
  selector: 'app-medicina-inmunizaciones',
  templateUrl: './medicina-inmunizaciones.component.html',
  styleUrls: ['./medicina-inmunizaciones.component.css']
})
export class MedicinaInmunizacionesComponent implements OnInit, OnDestroy {

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

  nroVacuna = [];

  loaded$ = of(false);

  inputs$?: Observable<InputDatos[]> = of([
    { id: "inm_hep_a", nombre: "Hepatitis A", for: "inm_hep_a", options: this.nroVacuna},
    { id: "inm_hep_b", nombre: "Hepatitis B", for: "inm_hep_b", options: this.nroVacuna},
    { id: "inm_trip", nombre: "Triple viral", for: "inm_trip", options: this.nroVacuna},
    { id: "inm_teta", nombre: "Tétanos", for: "inm_teta", options: this.nroVacuna},
    { id: "inm_mala", nombre: "Malaria", for: "inm_mala", options: this.nroVacuna},
    { id: "inm_amar", nombre: "F. Amarilla", for: "inm_amar", options: this.nroVacuna},
    { id: "inm_tifo", nombre: "F. Tifoidea", for: "inm_tifo", options: this.nroVacuna},
    { id: "inm_cov", nombre: "Covid", for: "inm_cov", options: this.nroVacuna},
  ]);

  inputs2$?: Observable<InputDatos[]> = of([
    { id: "mani_ali", nombre: "Carné manipulacion de alimentos", for: "mani_ali"},
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
      inm_hep_a: [data ? data.inm_hep_a : this.nroVacuna[0]["valor"] , [Validators.required, inAnexoValidator(this.nroVacuna)]],
      inm_hep_b: [data ? data.inm_hep_b : this.nroVacuna[0]["valor"] , [Validators.required, inAnexoValidator(this.nroVacuna)]],
      inm_trip: [data ? data.inm_trip : this.nroVacuna[0]["valor"] ,[Validators.required, inAnexoValidator(this.nroVacuna)]],
      inm_teta: [data ? data.inm_teta : this.nroVacuna[0]["valor"] ,[Validators.required, inAnexoValidator(this.nroVacuna)]],
      inm_mala: [data ? data.inm_mala : this.nroVacuna[0]["valor"] ,[Validators.required, inAnexoValidator(this.nroVacuna)]],
      inm_amar: [data ? data.inm_amar : this.nroVacuna[0]["valor"], [Validators.required, inAnexoValidator(this.nroVacuna)]],
      inm_tifo: [data ? data.inm_tifo : this.nroVacuna[0]["valor"], [Validators.required, inAnexoValidator(this.nroVacuna)]],
      inm_cov: [data ? data.inm_cov : this.nroVacuna[0]["valor"], [Validators.required, inAnexoValidator(this.nroVacuna)]],
      mani_ali: [data ? data.mani_ali : '', Validators.required],
      inm_obs: [data ? data.inm_obs : ''],
    });
  }

  ngOnInit(): void {
    let dataRecovery = localStorage.getItem("medicinaInmunizaciones");
    dataRecovery = dataRecovery ? JSON.parse(dataRecovery) : dataRecovery;

    this.currentPage = this.getCurrentPageUrl();
    this.obtenerAnexosService.getAnexos(["nroVacuna"]).subscribe(
      (response: InformacionAnexos) => {
        this.nroVacuna = this.obtenerAnexosService.formatear_datos(response.nroVacuna)

        this.inputs$ = of([
          { id: "inm_hep_a", nombre: "Hepatitis A", for: "inm_hep_a", options: this.nroVacuna},
          { id: "inm_hep_b", nombre: "Hepatitis B", for: "inm_hep_b", options: this.nroVacuna},
          { id: "inm_trip", nombre: "Triple viral", for: "inm_trip", options: this.nroVacuna},
          { id: "inm_teta", nombre: "Tétanos", for: "inm_teta", options: this.nroVacuna},
          { id: "inm_mala", nombre: "Malaria", for: "inm_mala", options: this.nroVacuna},
          { id: "inm_amar", nombre: "F. Amarilla", for: "inm_amar", options: this.nroVacuna},
          { id: "inm_tifo", nombre: "F. Tifoidea", for: "inm_tifo", options: this.nroVacuna},
          { id: "inm_cov", nombre: "Covid", for: "inm_cov", options: this.nroVacuna},
        ])

        this.inputs2$ = of([
          { id: "mani_ali", nombre: "Carné manipulacion de alimentos", for: "mani_ali"},
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
    localStorage.setItem("medicinaInmunizaciones", JSON.stringify(data));
  }
}
