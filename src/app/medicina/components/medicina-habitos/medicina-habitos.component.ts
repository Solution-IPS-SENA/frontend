import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { delay, filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-medicina-habitos',
  templateUrl: './medicina-habitos.component.html',
  styleUrls: ['./medicina-habitos.component.css']
})
export class MedicinaHabitosComponent implements OnInit, OnDestroy {


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

  loaded$ = of(false);

  inputs$?: Observable<InputDatos[]> = of([
    { id: "cigarrillo", nombre: "Cigarrillo", for: "cigarrillo", options: this.sino},
    { id: "alcohol", nombre: "Alcohol", for: "alcohol", options: this.sino},
    { id: "drogas", nombre: "Drogas", for: "drogas", options: this.sino},
    { id: "deportes", nombre: "Deportes", for: "deportes", options: this.sino},
    { id: "lesiones", nombre: "Lesiones", for: "lesiones", options: this.sino}
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
      cigarrillo: [data ? data.cigarrillo : this.sino[0]["valor"] , Validators.required],
      alcohol: [data ? data.alcohol : this.sino[0]["valor"] , Validators.required],
      drogas: [data ? data.drogas : this.sino[0]["valor"] ,Validators.required],
      deportes: [data ? data.deportes : this.sino[0]["valor"] ,Validators.required],
      lesiones: [data ? data.lesiones : this.sino[0]["valor"] ,Validators.required],
      observacionesHabitosMedicina: [data ? data.observacionesHabitosMedicina : ''],
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
    let dataRecovery = localStorage.getItem("medicinaHabitos");
    dataRecovery = dataRecovery ? JSON.parse(dataRecovery) : dataRecovery;

    this.currentPage = this.getCurrentPageUrl();
    this.obtenerAnexosService.getAnexos(["sino"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.sino = this.formatear_datos(response.sino)

        this.inputs$ = of([
          { id: "cigarrillo", nombre: "Cigarrillo", for: "cigarrillo", options: this.sino},
          { id: "alcohol", nombre: "Alcohol", for: "alcohol", options: this.sino},
          { id: "drogas", nombre: "Drogas", for: "drogas", options: this.sino},
          { id: "deportes", nombre: "Deportes", for: "deportes", options: this.sino},
          { id: "lesiones", nombre: "Lesiones", for: "lesiones", options: this.sino}
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
    localStorage.setItem("medicinaHabitos", JSON.stringify(data));
  }
}
