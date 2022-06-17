import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { delay, filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-psicologia-observacion-conductas',
  templateUrl: './psicologia-observacion-conductas.component.html',
  styleUrls: ['./psicologia-observacion-conductas.component.css']
})
export class PsicologiaObservacionConductasComponent implements OnInit, OnDestroy {

  public currentPage = 0;
  form!: FormGroup;
  state: boolean = false;
  private lifecycleSubj: Subject<string> = new Subject<string>();

  public onPageChange(currentPage: number) {
    this.router.navigate(['/historias', 'psicologia', currentPage]).then(() => {
      this.currentPage = this.getCurrentPageUrl();
    });
  }

  public getCurrentPageUrl(): number {
    const urlSegments = this.router.url.split('/');
    return parseInt(urlSegments[urlSegments.length - 1] ?? '0');
  }

  adecuacion = [];
  loaded$ = of(false);

  inputs$?: Observable<InputDatos[]> = of([
    { id: "presentacion", nombre: "Presentacion", for: "presentacion", options: this.adecuacion},
    { id: "postura", nombre: "Postura", for: "postura", options: this.adecuacion},
    { id: "discursoRitmo", nombre: "Discurso - Ritmo", for: "discursoRitmo", options: this.adecuacion},
    { id: "tono", nombre: "Tono", for: "tono", options: this.adecuacion},
    { id: "articulacion", nombre: "Articulacion", for: "articulacion", options: this.adecuacion},
    { id: "orientacionTiempo", nombre: "Orientacion - Tiempo", for: "orientacionTiempo", options: this.adecuacion},
    { id: "orientacionEspacio", nombre: "Orientacion - Espacio", for: "orientacionEspacio", options: this.adecuacion},
    { id: "orientacionPersona", nombre: "Orientacion - Persona", for: "orientacionPersona", options: this.adecuacion},
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
        presentacion: [data ? data.presentacion : this.adecuacion[0]["valor"], Validators.required],
        postura: [data ? data.postura : this.adecuacion[0]["valor"], Validators.required],
        discursoRitmo: [data ? data.discursoRitmo : this.adecuacion[0]["valor"] ,Validators.required],
        tono: [data ? data.tono : this.adecuacion[0]["valor"] ,Validators.required],
        articulacion: [data ? data.articulacion :this.adecuacion[0]["valor"], Validators.required],
        orientacionTiempo: [data ? data.orientacionTiempo : this.adecuacion[0]["valor"] ,Validators.required],
        orientacionEspacio: [data ? data.orientacionEspacio :this.adecuacion[0]["valor"], Validators.required],
        orientacionPersona: [data ? data.orientacionPersona : this.adecuacion[0]["valor"], Validators.required],
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
    let dataRecovery = localStorage.getItem("psicologiaObservacion");
    dataRecovery = dataRecovery ? JSON.parse(dataRecovery) : dataRecovery;

    this.currentPage = this.getCurrentPageUrl();
    this.obtenerAnexosService.getAnexos(["adecuacion"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.adecuacion = this.formatear_datos(response.adecuacion)

        this.inputs$ = of([
          { id: "presentacion", nombre: "Presentacion", for: "presentacion", options: this.adecuacion},
          { id: "postura", nombre: "Postura", for: "postura", options: this.adecuacion},
          { id: "discursoRitmo", nombre: "Discurso - Ritmo", for: "discursoRitmo", options: this.adecuacion},
          { id: "tono", nombre: "Tono", for: "tono", options: this.adecuacion},
          { id: "articulacion", nombre: "Articulacion", for: "articulacion", options: this.adecuacion},
          { id: "orientacionTiempo", nombre: "Orientacion - Tiempo", for: "orientacionTiempo", options: this.adecuacion},
          { id: "orientacionEspacio", nombre: "Orientacion - Espacio", for: "orientacionEspacio", options: this.adecuacion},
          { id: "orientacionPersona", nombre: "Orientacion - Persona", for: "orientacionPersona", options: this.adecuacion},
  ])
        this.loaded$ = of(true);
        this.createForm(dataRecovery);
        this.state = this.form.valid
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
    localStorage.setItem("psicologiaObservacion", JSON.stringify(data));
  }
}