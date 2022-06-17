import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputDatosDoble, InputDatos } from 'src/app/shared/interfaces/input-datos';
import { delay, filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-medicina-antecedentes',
  templateUrl: './medicina-antecedentes.component.html',
  styleUrls: ['./medicina-antecedentes.component.css']
})
export class MedicinaAntecedentesComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  public currentPage = 0;
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

  patologicos = [];
  referencia = [];
  ets = [];

  loaded$ = of(false);

  inputsFamiliares$?: Observable<InputDatosDoble[]> = of([
    { id: "padre", nombre: "Padre",options: this.patologicos, options2: this.patologicos, for:"antecedentesPadre1", for2:"antecedentesPadre2"},
    { id: "madre", nombre: "Madre", options: this.patologicos, options2: this.patologicos, for:"antecedentesMadre1", for2:"antecedentesMadre2"},
  ]);

  inputsPersonales$?: Observable<InputDatos[]> = of([
    { id: "patologicos", nombre: "Patológicos", for: "patologicos", options: this.patologicos},
    { id: "quirurgicos", nombre: "Quirúrgicos", for: "quirurgicos", options: this.patologicos},
    { id: "traumaticos", nombre: "Traumáticos", for: "traumaticos", options: this.patologicos},
    { id: "toxicos", nombre: "Tóxicos", for: "toxicos" , options: this.patologicos},
    { id: "alergicos", nombre: "Alérgicos", for: "alergicos", options: this.patologicos},
    { id: "farmacologicos", nombre: "Farmacológicos", for: "farmacologicos", options: this.patologicos},
    { id: "transfusionales", nombre: "Transfusionales", for: "transfusionales" , options: this.patologicos},
    { id: "ets", nombre: "E.T.S", for: "ets" , options: this.patologicos},
  ]);

  public get lifecycle$() {
    return this.lifecycleSubj.asObservable();
  }

  constructor(
    private obtenerAnexosService: ObtenerAnexosService,
    private router: Router,
    private fb: FormBuilder
    ){}

  createForm(data?: any){
    this.form = this.fb.group({
      antecedentesPadre1: [data ? data.antecedentesPadre1 : this.patologicos[0]["valor"] , Validators.required],
      antecedentesPadre2: [data ? data.antecedentesPadre2 : this.patologicos[0]["valor"] , Validators.required],
      antecedentesMadre1: [data ? data.antecedentesMadre1 : this.patologicos[0]["valor"] , Validators.required],
      antecedentesMadre2: [data ? data.antecedentesMadre2 : this.patologicos[0]["valor"] , Validators.required],
      patologicos: [data ? data.patologicos : this.patologicos[0]["valor"] , Validators.required],
      quirurgicos: [data ? data.quirurgicos : this.referencia[0]["valor"] , Validators.required],
      traumaticos: [data ? data.traumaticos : this.referencia[0]["valor"] , Validators.required],
      toxicos: [data ? data.toxicos : this.referencia[0]["valor"] , Validators.required],
      alergicos: [data ? data.alergicos : this.referencia[0]["valor"] , Validators.required],
      farmacologicos: [data ? data.farmacologicos : this.referencia[0]["valor"] , Validators.required],
      transfusionales: [data ? data.transfusionales : this.referencia[0]["valor"] , Validators.required],
      ets: [data ? data.ets : this.ets[0]["valor"] , Validators.required],
      observacionesAntecedentesMedicina : [data ? data.observacionesAntecedentesMedicina : ''],
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
    let dataRecovery = localStorage.getItem("medicinaAntecedentes");
    dataRecovery = dataRecovery ? JSON.parse(dataRecovery) : dataRecovery;

    this.currentPage = this.getCurrentPageUrl();
    this.obtenerAnexosService.getAnexos(["patologicos","referencia","ets"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.patologicos = this.formatear_datos(response.patologicos)
        this.referencia = this.formatear_datos(response.referencia)
        this.ets = this.formatear_datos(response.ets)

        this.inputsFamiliares$ = of([
          { id: "padre", nombre: "Padre",options: this.patologicos, options2: this.patologicos, for:"antecedentesPadre1", for2:"antecedentesPadre2"},
          { id: "madre", nombre: "Madre", options: this.patologicos, options2: this.patologicos, for:"antecedentesMadre1", for2:"antecedentesMadre2"},
        ])
        this.inputsPersonales$ = of([
          { id: "patologicos", nombre: "Patológicos", for: "patologicos", options: this.patologicos},
          { id: "quirurgicos", nombre: "Quirúrgicos", for: "quirurgicos", options: this.referencia},
          { id: "traumaticos", nombre: "Traumáticos", for: "traumaticos", options: this.referencia},
          { id: "toxicos", nombre: "Tóxicos", for: "toxicos" , options: this.referencia},
          { id: "alergicos", nombre: "Alérgicos", for: "alergicos", options: this.referencia},
          { id: "farmacologicos", nombre: "Farmacológicos", for: "farmacologicos", options: this.referencia},
          { id: "transfusionales", nombre: "Transfusionales", for: "transfusionales" , options: this.referencia},
          { id: "ets", nombre: "E.T.S", for: "ets" , options: this.ets},
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
    localStorage.setItem("medicinaAntecedentes", JSON.stringify(data));
  }
}
