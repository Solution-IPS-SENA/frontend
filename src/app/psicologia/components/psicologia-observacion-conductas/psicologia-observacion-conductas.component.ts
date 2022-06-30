import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { delay, filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inAnexoValidator } from 'src/app/shared/validators/in-anexo.validator';

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
    { id: "obs_cond_pres", nombre: "Presentación", for: "obs_cond_pres", options: this.adecuacion},
    { id: "obs_cond_post", nombre: "Postura", for: "obs_cond_post", options: this.adecuacion},
    { id: "obs_cond_disc", nombre: "Discurso - Ritmo", for: "obs_cond_disc", options: this.adecuacion},
    { id: "obs_cond_tono", nombre: "Tono", for: "obs_cond_tono", options: this.adecuacion},
    { id: "obs_cond_arti", nombre: "Articulación", for: "obs_cond_arti", options: this.adecuacion},
    { id: "obs_cond_orien_tiem", nombre: "Orientación - Tiempo", for: "obs_cond_orien_tiem", options: this.adecuacion},
    { id: "obs_cond_orien_esp", nombre: "Orientación - Espacio", for: "obs_cond_orien_esp", options: this.adecuacion},
    { id: "obs_cond_orien_perso", nombre: "Orientación - Persona", for: "obs_cond_orien_perso", options: this.adecuacion},
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
      obs_cond_pres: [data ? data.obs_cond_pres : this.adecuacion[0]["valor"], [Validators.required, inAnexoValidator(this.adecuacion)]],
      obs_cond_post: [data ? data.obs_cond_post : this.adecuacion[0]["valor"], [Validators.required, inAnexoValidator(this.adecuacion)]],
      obs_cond_disc: [data ? data.obs_cond_disc : this.adecuacion[0]["valor"] ,[Validators.required, inAnexoValidator(this.adecuacion)]],
      obs_cond_tono: [data ? data.obs_cond_tono : this.adecuacion[0]["valor"] ,[Validators.required, inAnexoValidator(this.adecuacion)]],
      obs_cond_arti: [data ? data.obs_cond_arti :this.adecuacion[0]["valor"], [Validators.required, inAnexoValidator(this.adecuacion)]],
      obs_cond_orien_tiem: [data ? data.obs_cond_orien_tiem : this.adecuacion[0]["valor"] ,[Validators.required, inAnexoValidator(this.adecuacion)]],
      obs_cond_orien_esp: [data ? data.obs_cond_orien_esp :this.adecuacion[0]["valor"], [Validators.required, inAnexoValidator(this.adecuacion)]],
      obs_cond_orien_perso: [data ? data.obs_cond_orien_perso : this.adecuacion[0]["valor"], [Validators.required, inAnexoValidator(this.adecuacion)]],
    });
  }

  ngOnInit(): void {
    let dataRecovery = localStorage.getItem("psicologiaObservacion");
    dataRecovery = dataRecovery ? JSON.parse(dataRecovery) : dataRecovery;

    this.currentPage = this.getCurrentPageUrl();
    this.obtenerAnexosService.getAnexos(["adecuacion"]).subscribe(
      (response: InformacionAnexos) => {
        this.adecuacion = this.obtenerAnexosService.formatear_datos(response.adecuacion)

        this.inputs$ = of([
          { id: "obs_cond_pres", nombre: "Presentación", for: "obs_cond_pres", options: this.adecuacion},
          { id: "obs_cond_post", nombre: "Postura", for: "obs_cond_post", options: this.adecuacion},
          { id: "obs_cond_disc", nombre: "Discurso - Ritmo", for: "obs_cond_disc", options: this.adecuacion},
          { id: "obs_cond_tono", nombre: "Tono", for: "obs_cond_tono", options: this.adecuacion},
          { id: "obs_cond_arti", nombre: "Articulación", for: "obs_cond_arti", options: this.adecuacion},
          { id: "obs_cond_orien_tiem", nombre: "Orientación - Tiempo", for: "obs_cond_orien_tiem", options: this.adecuacion},
          { id: "obs_cond_orien_esp", nombre: "Orientación - Espacio", for: "obs_cond_orien_esp", options: this.adecuacion},
          { id: "obs_cond_orien_perso", nombre: "Orientación - Persona", for: "obs_cond_orien_perso", options: this.adecuacion},
  ])
        this.createForm(dataRecovery);
        this.loaded$ = of(true);
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
