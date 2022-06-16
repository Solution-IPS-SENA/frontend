import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { delay, filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inAnexoValidator } from 'src/app/shared/validators/in-anexo.validator';

@Component({
  selector: 'app-medicina-factor-riesgo',
  templateUrl: './medicina-factor-riesgo.component.html',
  styleUrls: ['./medicina-factor-riesgo.component.css']
})
export class MedicinaFactorRiesgoComponent implements OnInit, OnDestroy {

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

  fisico = [];
  biologico = [];
  quimico = [];
  seguridad = [];
  biomecanico = [];
  psicosocial = [];

  loaded$ = of(false);

  inputsTitulos$?: Observable<InputDatos[]> = of([
    { id: "tituloFisico", nombre: "Físico", for: "tituloFisico"},
    { id: "tituloBiologico", nombre: "Biológico", for: "tituloBiologico"},
    { id: "tituloQuimico", nombre: "Químico", for: "tituloQuimico"},
    { id: "tituloSeguridad", nombre: "Seguridad", for: "tituloSeguridad"},
    { id: "tituloBiomecanico", nombre: "Biomecánico", for: "tituloBiomecanico"},
    { id: "tituloPsicosocial", nombre: "Psicosocial", for: "tituloPsicosocial"},
  ]);

  inputs$?: Observable<InputDatos[]> = of([
    { id: "fisicoFactorRiesgoFactores1", nombre: "Dermatológico1", for: "fisicoFactorRiesgoFactores1", options: this.fisico},
    { id: "biologicoFactorRiesgoFactores1", nombre: "Osteomuscular1", for: "biologicoFactorRiesgoFactores1", options: this.biologico},
    { id: "quimicoFactorRiesgoFactores1", nombre: "Osteoarticular1", for: "quimicoFactorRiesgoFactores1", options: this.quimico},
    { id: "seguridadFactorRiesgoFactores1", nombre: "Genitourinario1", for: "seguridadFactorRiesgoFactores1", options: this.seguridad},
    { id: "biomecanicoFactorRiesgoFactores1", nombre: "Metabólico1", for: "biomecanicoFactorRiesgoFactores1", options: this.biomecanico},
    { id: "psicosocialFactorRiesgoFactores1", nombre: "Neurológico1", for: "psicosocialFactorRiesgoFactores1", options: this.psicosocial},
    { id: "fisicoFactorRiesgoFactores2", nombre: "Dermatológico2", for: "fisicoFactorRiesgoFactores2", options: this.fisico},
    { id: "biologicoFactorRiesgoFactores2", nombre: "Osteomuscular2", for: "biologicoFactorRiesgoFactores2", options: this.biologico},
    { id: "quimicoFactorRiesgoFactores2", nombre: "Osteoarticular2", for: "quimicoFactorRiesgoFactores2", options: this.quimico},
    { id: "seguridadFactorRiesgoFactores2", nombre: "Genitourinario2", for: "seguridadFactorRiesgoFactores2", options: this.seguridad},
    { id: "biomecanicoFactorRiesgoFactores2", nombre: "Metabólico2", for: "biomecanicoFactorRiesgoFactores2", options: this.biomecanico},
    { id: "psicosocialFactorRiesgoFactores2", nombre: "Neurológico2", for: "psicosocialFactorRiesgoFactores2", options: this.psicosocial},
    { id: "fisicoFactorRiesgoFactores3", nombre: "Dermatológico3", for: "fisicoFactorRiesgoFactores3", options: this.fisico},
    { id: "biologicoFactorRiesgoFactores3", nombre: "Osteomuscular3", for: "biologicoFactorRiesgoFactores3", options: this.biologico},
    { id: "quimicoFactorRiesgoFactores3", nombre: "Osteoarticular3", for: "quimicoFactorRiesgoFactores3", options: this.quimico},
    { id: "seguridadFactorRiesgoFactores3", nombre: "Genitourinario3", for: "seguridadFactorRiesgoFactores3", options: this.seguridad},
    { id: "biomecanicoFactorRiesgoFactores3", nombre: "Metabólico3", for: "biomecanicoFactorRiesgoFactores3", options: this.biomecanico},
    { id: "psicosocialFactorRiesgoFactores3", nombre: "Neurológico3", for: "psicosocialFactorRiesgoFactores3", options: this.psicosocial},
    { id: "fisicoFactorRiesgoFactores4", nombre: "Dermatológico4", for: "fisicoFactorRiesgoFactores4", options: this.fisico},
    { id: "biologicoFactorRiesgoFactores4", nombre: "Osteomuscular4", for: "biologicoFactorRiesgoFactores4", options: this.biologico},
    { id: "quimicoFactorRiesgoFactores4", nombre: "Osteoarticular4", for: "quimicoFactorRiesgoFactores4", options: this.quimico},
    { id: "seguridadFactorRiesgoFactores4", nombre: "Genitourinario4", for: "seguridadFactorRiesgoFactores4", options: this.seguridad},
    { id: "biomecanicoFactorRiesgoFactores4", nombre: "Metabólico4", for: "biomecanicoFactorRiesgoFactores4", options: this.biomecanico},
    { id: "psicosocialFactorRiesgoFactores4", nombre: "Neurológico4", for: "psicosocialFactorRiesgoFactores4", options: this.psicosocial},
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
      fisicoFactorRiesgoFactores1: [data ? data.fisicoFactorRiesgoFactores1 : this.fisico[0]["valor"] , [Validators.required, inAnexoValidator(this.fisico)]],
      biologicoFactorRiesgoFactores1: [data ? data.biologicoFactorRiesgoFactores1 : this.biologico[0]["valor"] , [Validators.required, inAnexoValidator(this.biologico)]],
      quimicoFactorRiesgoFactores1: [data ? data.quimicoFactorRiesgoFactores1 : this.quimico[0]["valor"] ,[Validators.required, inAnexoValidator(this.quimico)]],
      seguridadFactorRiesgoFactores1: [data ? data.seguridadFactorRiesgoFactores1 : this.seguridad[0]["valor"] ,[Validators.required, inAnexoValidator(this.seguridad)]],
      biomecanicoFactorRiesgoFactores1: [data ? data.biomecanicoFactorRiesgoFactores1 : this.biomecanico[0]["valor"] ,[Validators.required, inAnexoValidator(this.biomecanico)]],
      psicosocialFactorRiesgoFactores1: [data ? data.psicosocialFactorRiesgoFactores1 : this.psicosocial[0]["valor"] ,[Validators.required, inAnexoValidator(this.psicosocial)]],
      fisicoFactorRiesgoFactores2: [data ? data.fisicoFactorRiesgoFactores2 : this.fisico[0]["valor"] , [Validators.required, inAnexoValidator(this.fisico)]],
      biologicoFactorRiesgoFactores2: [data ? data.biologicoFactorRiesgoFactores2 : this.biologico[0]["valor"] , [Validators.required, inAnexoValidator(this.biologico)]],
      quimicoFactorRiesgoFactores2: [data ? data.quimicoFactorRiesgoFactores2 : this.quimico[0]["valor"] ,[Validators.required, inAnexoValidator(this.quimico)]],
      seguridadFactorRiesgoFactores2: [data ? data.seguridadFactorRiesgoFactores2 : this.seguridad[0]["valor"] ,[Validators.required, inAnexoValidator(this.seguridad)]],
      biomecanicoFactorRiesgoFactores2: [data ? data.biomecanicoFactorRiesgoFactores2 : this.biomecanico[0]["valor"] ,[Validators.required, inAnexoValidator(this.biomecanico)]],
      psicosocialFactorRiesgoFactores2: [data ? data.psicosocialFactorRiesgoFactores2 : this.psicosocial[0]["valor"] ,[Validators.required, inAnexoValidator(this.psicosocial)]],
      fisicoFactorRiesgoFactores3: [data ? data.fisicoFactorRiesgoFactores3 : this.fisico[0]["valor"] , [Validators.required, inAnexoValidator(this.fisico)]],
      biologicoFactorRiesgoFactores3: [data ? data.biologicoFactorRiesgoFactores3 : this.biologico[0]["valor"] , [Validators.required, inAnexoValidator(this.biologico)]],
      quimicoFactorRiesgoFactores3: [data ? data.quimicoFactorRiesgoFactores3 : this.quimico[0]["valor"] ,[Validators.required, inAnexoValidator(this.quimico)]],
      seguridadFactorRiesgoFactores3: [data ? data.seguridadFactorRiesgoFactores3 : this.seguridad[0]["valor"] ,[Validators.required, inAnexoValidator(this.seguridad)]],
      biomecanicoFactorRiesgoFactores3: [data ? data.biomecanicoFactorRiesgoFactores3 : this.biomecanico[0]["valor"] ,[Validators.required, inAnexoValidator(this.biomecanico)]],
      psicosocialFactorRiesgoFactores3: [data ? data.psicosocialFactorRiesgoFactores3 : this.psicosocial[0]["valor"] ,[Validators.required, inAnexoValidator(this.psicosocial)]],
      fisicoFactorRiesgoFactores4: [data ? data.fisicoFactorRiesgoFactores4 : this.fisico[0]["valor"] , [Validators.required, inAnexoValidator(this.fisico)]],
      biologicoFactorRiesgoFactores4: [data ? data.biologicoFactorRiesgoFactores4 : this.biologico[0]["valor"] , [Validators.required, inAnexoValidator(this.biologico)]],
      quimicoFactorRiesgoFactores4: [data ? data.quimicoFactorRiesgoFactores4 : this.quimico[0]["valor"] ,[Validators.required, inAnexoValidator(this.quimico)]],
      seguridadFactorRiesgoFactores4: [data ? data.seguridadFactorRiesgoFactores4 : this.seguridad[0]["valor"] ,[Validators.required, inAnexoValidator(this.seguridad)]],
      biomecanicoFactorRiesgoFactores4: [data ? data.biomecanicoFactorRiesgoFactores4 : this.biomecanico[0]["valor"] ,[Validators.required, inAnexoValidator(this.biomecanico)]],
      psicosocialFactorRiesgoFactores4: [data ? data.psicosocialFactorRiesgoFactores4 : this.psicosocial[0]["valor"] ,[Validators.required, inAnexoValidator(this.psicosocial)]],
      observacionesFactoresRiesgoMedicina: [data ? data.observacionesFactoresRiesgoMedicina : ''],
    });
  }

  ngOnInit(): void {
    let dataRecovery = localStorage.getItem("medicinaFactores");
    dataRecovery = dataRecovery ? JSON.parse(dataRecovery) : dataRecovery;

    this.currentPage = this.getCurrentPageUrl();
    this.obtenerAnexosService.getAnexos(["fisico","biologico","quimico","seguridad","biomecanico","psicosocial"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.fisico = this.obtenerAnexosService.formatear_datos(response.fisico)
        this.biologico = this.obtenerAnexosService.formatear_datos(response.biologico)
        this.quimico = this.obtenerAnexosService.formatear_datos(response.quimico)
        this.seguridad = this.obtenerAnexosService.formatear_datos(response.seguridad)
        this.biomecanico = this.obtenerAnexosService.formatear_datos(response.biomecanico)
        this.psicosocial = this.obtenerAnexosService.formatear_datos(response.psicosocial)

        this.inputs$ = of([
          { id: "fisicoFactorRiesgoFactores1", nombre: "Dermatológico1", for: "fisicoFactorRiesgoFactores1", options: this.fisico},
          { id: "biologicoFactorRiesgoFactores1", nombre: "Osteomuscular1", for: "biologicoFactorRiesgoFactores1", options: this.biologico},
          { id: "quimicoFactorRiesgoFactores1", nombre: "Osteoarticular1", for: "quimicoFactorRiesgoFactores1", options: this.quimico},
          { id: "seguridadFactorRiesgoFactores1", nombre: "Genitourinario1", for: "seguridadFactorRiesgoFactores1", options: this.seguridad},
          { id: "biomecanicoFactorRiesgoFactores1", nombre: "Metabólico1", for: "biomecanicoFactorRiesgoFactores1", options: this.biomecanico},
          { id: "psicosocialFactorRiesgoFactores1", nombre: "Neurológico1", for: "psicosocialFactorRiesgoFactores1", options: this.psicosocial},
          { id: "fisicoFactorRiesgoFactores2", nombre: "Dermatológico2", for: "fisicoFactorRiesgoFactores2", options: this.fisico},
          { id: "biologicoFactorRiesgoFactores2", nombre: "Osteomuscular2", for: "biologicoFactorRiesgoFactores2", options: this.biologico},
          { id: "quimicoFactorRiesgoFactores2", nombre: "Osteoarticular2", for: "quimicoFactorRiesgoFactores2", options: this.quimico},
          { id: "seguridadFactorRiesgoFactores2", nombre: "Genitourinario2", for: "seguridadFactorRiesgoFactores2", options: this.seguridad},
          { id: "biomecanicoFactorRiesgoFactores2", nombre: "Metabólico2", for: "biomecanicoFactorRiesgoFactores2", options: this.biomecanico},
          { id: "psicosocialFactorRiesgoFactores2", nombre: "Neurológico2", for: "psicosocialFactorRiesgoFactores2", options: this.psicosocial},
          { id: "fisicoFactorRiesgoFactores3", nombre: "Dermatológico3", for: "fisicoFactorRiesgoFactores3", options: this.fisico},
          { id: "biologicoFactorRiesgoFactores3", nombre: "Osteomuscular3", for: "biologicoFactorRiesgoFactores3", options: this.biologico},
          { id: "quimicoFactorRiesgoFactores3", nombre: "Osteoarticular3", for: "quimicoFactorRiesgoFactores3", options: this.quimico},
          { id: "seguridadFactorRiesgoFactores3", nombre: "Genitourinario3", for: "seguridadFactorRiesgoFactores3", options: this.seguridad},
          { id: "biomecanicoFactorRiesgoFactores3", nombre: "Metabólico3", for: "biomecanicoFactorRiesgoFactores3", options: this.biomecanico},
          { id: "psicosocialFactorRiesgoFactores3", nombre: "Neurológico3", for: "psicosocialFactorRiesgoFactores3", options: this.psicosocial},
          { id: "fisicoFactorRiesgoFactores4", nombre: "Dermatológico4", for: "fisicoFactorRiesgoFactores4", options: this.fisico},
          { id: "biologicoFactorRiesgoFactores4", nombre: "Osteomuscular4", for: "biologicoFactorRiesgoFactores4", options: this.biologico},
          { id: "quimicoFactorRiesgoFactores4", nombre: "Osteoarticular4", for: "quimicoFactorRiesgoFactores4", options: this.quimico},
          { id: "seguridadFactorRiesgoFactores4", nombre: "Genitourinario4", for: "seguridadFactorRiesgoFactores4", options: this.seguridad},
          { id: "biomecanicoFactorRiesgoFactores4", nombre: "Metabólico4", for: "biomecanicoFactorRiesgoFactores4", options: this.biomecanico},
          { id: "psicosocialFactorRiesgoFactores4", nombre: "Neurológico4", for: "psicosocialFactorRiesgoFactores4", options: this.psicosocial},
        ])

        this.inputsTitulos$ = of([
          { id: "tituloFisico", nombre: "Físico", for: "tituloFisico"},
          { id: "tituloBiologico", nombre: "Biológico", for: "tituloBiologico"},
          { id: "tituloQuimico", nombre: "Químico", for: "tituloQuimico"},
          { id: "tituloSeguridad", nombre: "Seguridad", for: "tituloSeguridad"},
          { id: "tituloBiomecanico", nombre: "Biomecánico", for: "tituloBiomecanico"},
          { id: "tituloPsicosocial", nombre: "Psicosocial", for: "tituloPsicosocial"},
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
    localStorage.setItem("medicinaFactores", JSON.stringify(data));
  }
}
