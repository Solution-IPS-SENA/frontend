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
    { id: "hepatitisA", nombre: "Hepatitis A", for: "hepatitisA", options: this.nroVacuna},
    { id: "hepatitisB", nombre: "HepatitisB", for: "hepatitisB", options: this.nroVacuna},
    { id: "tripleViral", nombre: "Triple viral", for: "tripleViral", options: this.nroVacuna},
    { id: "tétanos", nombre: "Tétanos", for: "tétanos", options: this.nroVacuna},
    { id: "malaria", nombre: "Malaria", for: "malaria", options: this.nroVacuna},
    { id: "fAmarilla", nombre: "F. Amarilla", for: "fAmarilla", options: this.nroVacuna},
    { id: "fTifoidea", nombre: "F. Tifoidea", for: "fTifoidea", options: this.nroVacuna},
    { id: "covid", nombre: "Covid", for: "covid", options: this.nroVacuna},
  ]);

  inputs2$?: Observable<InputDatos[]> = of([
    { id: "carneManipulacionAlimentos", nombre: "Carné manipulacion de alimentos", for: "carneManipulacionAlimentos"},
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
      hepatitisA: [data ? data.hepatitisA : this.nroVacuna[0]["valor"] , [Validators.required, inAnexoValidator(this.nroVacuna)]],
      hepatitisB: [data ? data.hepatitisB : this.nroVacuna[0]["valor"] , [Validators.required, inAnexoValidator(this.nroVacuna)]],
      tripleViral: [data ? data.tripleViral : this.nroVacuna[0]["valor"] ,[Validators.required, inAnexoValidator(this.nroVacuna)]],
      tétanos: [data ? data.tétanos : this.nroVacuna[0]["valor"] ,[Validators.required, inAnexoValidator(this.nroVacuna)]],
      malaria: [data ? data.malaria : this.nroVacuna[0]["valor"] ,[Validators.required, inAnexoValidator(this.nroVacuna)]],
      fAmarilla: [data ? data.fAmarilla : this.nroVacuna[0]["valor"], [Validators.required, inAnexoValidator(this.nroVacuna)]],
      fTifoidea: [data ? data.fTifoidea : this.nroVacuna[0]["valor"], [Validators.required, inAnexoValidator(this.nroVacuna)]],
      covid: [data ? data.covid : this.nroVacuna[0]["valor"], [Validators.required, inAnexoValidator(this.nroVacuna)]],
      carneManipulacionAlimentos: [data ? data.carneManipulacionAlimentos : '', Validators.required],
      observacionesInmunizacionesMedicina: [data ? data.observacionesInmunizacionesMedicina : ''],
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
    let dataRecovery = localStorage.getItem("medicinaInmunizaciones");
    dataRecovery = dataRecovery ? JSON.parse(dataRecovery) : dataRecovery;

    this.currentPage = this.getCurrentPageUrl();
    this.obtenerAnexosService.getAnexos(["nroVacuna"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.nroVacuna = this.formatear_datos(response.nroVacuna)

        this.inputs$ = of([
          { id: "hepatitisA", nombre: "Hepatitis A", for: "hepatitisA", options: this.nroVacuna},
          { id: "hepatitisB", nombre: "HepatitisB", for: "hepatitisB", options: this.nroVacuna},
          { id: "tripleViral", nombre: "Triple viral", for: "tripleViral", options: this.nroVacuna},
          { id: "tétanos", nombre: "Tétanos", for: "tétanos", options: this.nroVacuna},
          { id: "malaria", nombre: "Malaria", for: "malaria", options: this.nroVacuna},
          { id: "fAmarilla", nombre: "F. Amarilla", for: "fAmarilla", options: this.nroVacuna},
          { id: "fTifoidea", nombre: "F. Tifoidea", for: "fTifoidea", options: this.nroVacuna},
          { id: "covid", nombre: "Covid", for: "covid", options: this.nroVacuna},
        ])

        this.inputs2$ = of([
          { id: "carneManipulacionAlimentos", nombre: "Carné manipulacion de alimentos", for: "carneManipulacionAlimentos"},
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
