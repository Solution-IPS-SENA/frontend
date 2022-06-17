import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { delay, filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inAnexoValidator } from 'src/app/shared/validators/in-anexo.validator';

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
    { id: "hab_ciga", nombre: "Cigarrillo", for: "hab_ciga", options: this.sino},
    { id: "hab_alco", nombre: "Alcohol", for: "hab_alco", options: this.sino},
    { id: "hab_drog", nombre: "Drogas", for: "hab_drog", options: this.sino},
    { id: "hab_dep", nombre: "Deportes", for: "hab_dep", options: this.sino},
    { id: "hab_les", nombre: "Lesiones", for: "hab_les", options: this.sino}
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
      hab_ciga: [data ? data.hab_ciga : this.sino[0]["valor"] , [Validators.required, inAnexoValidator(this.sino)]],
      hab_alco: [data ? data.hab_alco : this.sino[0]["valor"] , [Validators.required, inAnexoValidator(this.sino)]],
      hab_drog: [data ? data.hab_drog : this.sino[0]["valor"] ,[Validators.required, inAnexoValidator(this.sino)]],
      hab_dep: [data ? data.hab_dep : this.sino[0]["valor"] ,[Validators.required, inAnexoValidator(this.sino)]],
      hab_les: [data ? data.hab_les : this.sino[0]["valor"] ,[Validators.required, inAnexoValidator(this.sino)]],
      hab_obs: [data ? data.hab_obs : ''],
    });
  }

  ngOnInit(): void {
    let dataRecovery = localStorage.getItem("medicinaHabitos");
    dataRecovery = dataRecovery ? JSON.parse(dataRecovery) : dataRecovery;

    this.currentPage = this.getCurrentPageUrl();
    this.obtenerAnexosService.getAnexos(["sino"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.sino = this.obtenerAnexosService.formatear_datos(response.sino)

        this.inputs$ = of([
          { id: "hab_ciga", nombre: "Cigarrillo", for: "hab_ciga", options: this.sino},
          { id: "hab_alco", nombre: "Alcohol", for: "hab_alco", options: this.sino},
          { id: "hab_drog", nombre: "Drogas", for: "hab_drog", options: this.sino},
          { id: "hab_dep", nombre: "Deportes", for: "hab_dep", options: this.sino},
          { id: "hab_les", nombre: "Lesiones", for: "hab_les", options: this.sino}
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
