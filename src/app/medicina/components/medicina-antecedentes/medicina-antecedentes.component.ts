import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputDatosDoble, InputDatos } from 'src/app/shared/interfaces/input-datos';
import { delay, filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inAnexoValidator } from 'src/app/shared/validators/in-anexo.validator';

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
    { id: "ant_per_pato", nombre: "Patológicos", for: "ant_per_pato", options: this.patologicos},
    { id: "ant_per_qui", nombre: "Quirúrgicos", for: "ant_per_qui", options: this.referencia},
    { id: "ant_per_trau", nombre: "Traumáticos", for: "ant_per_trau", options: this.referencia},
    { id: "ant_per_toxi", nombre: "Tóxicos", for: "ant_per_toxi" , options: this.referencia},
    { id: "ant_per_alergi", nombre: "Alérgicos", for: "ant_per_alergi", options: this.referencia},
    { id: "farmacologicos", nombre: "Farmacológicos", for: "farmacologicos", options: this.referencia},
    { id: "transfusionales", nombre: "Transfusionales", for: "transfusionales" , options: this.referencia},
    { id: "ant_per_ets", nombre: "E.T.S", for: "ant_per_ets" , options: this.ets},
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
      ant_padre_card: [data ? data.ant_padre_card : this.patologicos[0]["valor"] , [Validators.required, inAnexoValidator(this.patologicos)]],
      ant_padre_cong: [data ? data.ant_padre_cong : this.patologicos[0]["valor"] , [Validators.required, inAnexoValidator(this.patologicos)]],
      ant_madre_card: [data ? data.ant_madre_card : this.patologicos[0]["valor"] , [Validators.required, inAnexoValidator(this.patologicos)]],
      ant_madre_cong: [data ? data.ant_madre_cong : this.patologicos[0]["valor"] , [Validators.required, inAnexoValidator(this.patologicos)]],
      ant_per_pato: [data ? data.ant_per_pato : this.patologicos[0]["valor"] , [Validators.required, inAnexoValidator(this.patologicos)]],
      ant_per_qui: [data ? data.ant_per_qui : this.referencia[0]["valor"] , [Validators.required, inAnexoValidator(this.referencia)]],
      ant_per_trau: [data ? data.ant_per_trau : this.referencia[0]["valor"] , [Validators.required, inAnexoValidator(this.referencia)]],
      ant_per_toxi: [data ? data.ant_per_toxi : this.referencia[0]["valor"] , [Validators.required, inAnexoValidator(this.referencia)]],
      ant_per_alergi: [data ? data.ant_per_alergi : this.referencia[0]["valor"] , [Validators.required, inAnexoValidator(this.referencia)]],
      farmacologicos: [data ? data.farmacologicos : this.referencia[0]["valor"] , [Validators.required, inAnexoValidator(this.referencia)]],
      transfusionales: [data ? data.transfusionales : this.referencia[0]["valor"] , [Validators.required, inAnexoValidator(this.referencia)]],
      ant_per_ets: [data ? data.ant_per_ets : this.ets[0]["valor"] , [Validators.required, inAnexoValidator(this.ets)]],
      ant_per_obs1 : [data ? data.ant_per_obs1 : ''],
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
          { id: "padre", nombre: "Padre",options: this.patologicos, options2: this.patologicos, for:"ant_padre_card", for2:"ant_padre_cong"},
          { id: "madre", nombre: "Madre", options: this.patologicos, options2: this.patologicos, for:"ant_madre_card", for2:"ant_madre_cong"},
        ])
        this.inputsPersonales$ = of([
          { id: "ant_per_pato", nombre: "Patológicos", for: "ant_per_pato", options: this.patologicos},
          { id: "ant_per_qui", nombre: "Quirúrgicos", for: "ant_per_qui", options: this.referencia},
          { id: "ant_per_trau", nombre: "Traumáticos", for: "ant_per_trau", options: this.referencia},
          { id: "ant_per_toxi", nombre: "Tóxicos", for: "ant_per_toxi" , options: this.referencia},
          { id: "ant_per_alergi", nombre: "Alérgicos", for: "ant_per_alergi", options: this.referencia},
          { id: "farmacologicos", nombre: "Farmacológicos", for: "farmacologicos", options: this.referencia},
          { id: "transfusionales", nombre: "Transfusionales", for: "transfusionales" , options: this.referencia},
          { id: "ant_per_ets", nombre: "E.T.S", for: "ant_per_ets" , options: this.ets},
        ])

        this.createForm(dataRecovery);
        this.loaded$ = of(true);
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
