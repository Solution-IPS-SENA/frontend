import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { delay, filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-medicina-antecedentes-ocupacionales',
  templateUrl: './medicina-antecedentes-ocupacionales.component.html',
  styleUrls: ['./medicina-antecedentes-ocupacionales.component.css']
})
export class MedicinaAntecedentesOcupacionalesComponent implements OnInit, OnDestroy {

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
    { id: "fisicoFactorRiesgoOcupacional1", nombre: "Dermatológico", for: "fisicoFactorRiesgoOcupacional1", options: this.fisico},
    { id: "biologicoFactorRiesgoOcupacional1", nombre: "Osteomuscular", for: "biologicoFactorRiesgoOcupacional1", options: this.biologico},
    { id: "quimicoFactorRiesgoOcupacional1", nombre: "Osteoarticular", for: "quimicoFactorRiesgoOcupacional1", options: this.quimico},
    { id: "seguridadFactorRiesgoOcupacional1", nombre: "Genitourinario", for: "seguridadFactorRiesgoOcupacional1", options: this.seguridad},
    { id: "biomecanicoFactorRiesgoOcupacional1", nombre: "Metabólico", for: "biomecanicoFactorRiesgoOcupacional1", options: this.biomecanico},
    { id: "psicosocialFactorRiesgoOcupacional1", nombre: "Neurológico", for: "psicosocialFactorRiesgoOcupacional1", options: this.psicosocial},
    { id: "fisicoFactorRiesgoOcupacional2", nombre: "Dermatológico", for: "fisicoFactorRiesgoOcupacional2", options: this.fisico},
    { id: "biologicoFactorRiesgoOcupacional2", nombre: "Osteomuscular", for: "biologicoFactorRiesgoOcupacional2", options: this.biologico},
    { id: "quimicoFactorRiesgoOcupacional2", nombre: "Osteoarticular", for: "quimicoFactorRiesgoOcupacional2", options: this.quimico},
    { id: "seguridadFactorRiesgoOcupacional2", nombre: "Genitourinario", for: "seguridadFactorRiesgoOcupacional2", options: this.seguridad},
    { id: "biomecanicoFactorRiesgoOcupacional2", nombre: "Metabólico", for: "biomecanicoFactorRiesgoOcupacional2", options: this.biomecanico},
    { id: "psicosocialFactorRiesgoOcupacional2", nombre: "Neurológico", for: "psicosocialFactorRiesgoOcupacional2", options: this.psicosocial},
    { id: "fisicoFactorRiesgoOcupacional3", nombre: "Dermatológico", for: "fisicoFactorRiesgoOcupacional3", options: this.fisico},
    { id: "biologicoFactorRiesgoOcupacional3", nombre: "Osteomuscular", for: "biologicoFactorRiesgoOcupacional3", options: this.biologico},
    { id: "quimicoFactorRiesgoOcupacional3", nombre: "Osteoarticular", for: "quimicoFactorRiesgoOcupacional3", options: this.quimico},
    { id: "seguridadFactorRiesgoOcupacional3", nombre: "Genitourinario", for: "seguridadFactorRiesgoOcupacional3", options: this.seguridad},
    { id: "biomecanicoFactorRiesgoOcupacional3", nombre: "Metabólico", for: "biomecanicoFactorRiesgoOcupacional3", options: this.biomecanico},
    { id: "psicosocialFactorRiesgoOcupacional3", nombre: "Neurológico", for: "psicosocialFactorRiesgoOcupacional3", options: this.psicosocial},
    { id: "fisicoFactorRiesgoOcupacional4", nombre: "Dermatológico", for: "fisicoFactorRiesgoOcupacional4", options: this.fisico},
    { id: "biologicoFactorRiesgoOcupacional4", nombre: "Osteomuscular", for: "biologicoFactorRiesgoOcupacional4", options: this.biologico},
    { id: "quimicoFactorRiesgoOcupacional4", nombre: "Osteoarticular", for: "quimicoFactorRiesgoOcupacional4", options: this.quimico},
    { id: "seguridadFactorRiesgoOcupacional4", nombre: "Genitourinario", for: "seguridadFactorRiesgoOcupacional4", options: this.seguridad},
    { id: "biomecanicoFactorRiesgoOcupacional4", nombre: "Metabólico", for: "biomecanicoFactorRiesgoOcupacional4", options: this.biomecanico},
    { id: "psicosocialFactorRiesgoOcupacional4", nombre: "Neurológico", for: "psicosocialFactorRiesgoOcupacional4", options: this.psicosocial},
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
      fisicoFactorRiesgoOcupacional1: [data ? data.fisicoFactorRiesgoOcupacional1 : this.fisico[0]["valor"] , Validators.required],
      biologicoFactorRiesgoOcupacional1: [data ? data.biologicoFactorRiesgoOcupacional1 : this.biologico[0]["valor"] , Validators.required],
      quimicoFactorRiesgoOcupacional1: [data ? data.quimicoFactorRiesgoOcupacional1 : this.quimico[0]["valor"] ,Validators.required],
      seguridadFactorRiesgoOcupacional1: [data ? data.seguridadFactorRiesgoOcupacional1 : this.seguridad[0]["valor"] ,Validators.required],
      biomecanicoFactorRiesgoOcupacional1: [data ? data.biomecanicoFactorRiesgoOcupacional1 : this.biomecanico[0]["valor"] ,Validators.required],
      psicosocialFactorRiesgoOcupacional1: [data ? data.psicosocialFactorRiesgoOcupacional1 : this.psicosocial[0]["valor"] ,Validators.required],
      fisicoFactorRiesgoOcupacional2: [data ? data.fisicoFactorRiesgoOcupacional2 : this.fisico[0]["valor"] , Validators.required],
      biologicoFactorRiesgoOcupacional2: [data ? data.biologicoFactorRiesgoOcupacional2 : this.biologico[0]["valor"] , Validators.required],
      quimicoFactorRiesgoOcupacional2: [data ? data.quimicoFactorRiesgoOcupacional2 : this.quimico[0]["valor"] ,Validators.required],
      seguridadFactorRiesgoOcupacional2: [data ? data.seguridadFactorRiesgoOcupacional2 : this.seguridad[0]["valor"] ,Validators.required],
      biomecanicoFactorRiesgoOcupacional2: [data ? data.biomecanicoFactorRiesgoOcupacional2 : this.biomecanico[0]["valor"] ,Validators.required],
      psicosocialFactorRiesgoOcupacional2: [data ? data.psicosocialFactorRiesgoOcupacional2 : this.psicosocial[0]["valor"] ,Validators.required],
      fisicoFactorRiesgoOcupacional3: [data ? data.fisicoFactorRiesgoOcupacional3 : this.fisico[0]["valor"] , Validators.required],
      biologicoFactorRiesgoOcupacional3: [data ? data.biologicoFactorRiesgoOcupacional3 : this.biologico[0]["valor"] , Validators.required],
      quimicoFactorRiesgoOcupacional3: [data ? data.quimicoFactorRiesgoOcupacional3 : this.quimico[0]["valor"] ,Validators.required],
      seguridadFactorRiesgoOcupacional3: [data ? data.seguridadFactorRiesgoOcupacional3 : this.seguridad[0]["valor"] ,Validators.required],
      biomecanicoFactorRiesgoOcupacional3: [data ? data.biomecanicoFactorRiesgoOcupacional3 : this.biomecanico[0]["valor"] ,Validators.required],
      psicosocialFactorRiesgoOcupacional3: [data ? data.psicosocialFactorRiesgoOcupacional3 : this.psicosocial[0]["valor"] ,Validators.required],
      fisicoFactorRiesgoOcupacional4: [data ? data.fisicoFactorRiesgoOcupacional4 : this.fisico[0]["valor"] , Validators.required],
      biologicoFactorRiesgoOcupacional4: [data ? data.biologicoFactorRiesgoOcupacional4 : this.biologico[0]["valor"] , Validators.required],
      quimicoFactorRiesgoOcupacional4: [data ? data.quimicoFactorRiesgoOcupacional4 : this.quimico[0]["valor"] ,Validators.required],
      seguridadFactorRiesgoOcupacional4: [data ? data.seguridadFactorRiesgoOcupacional4 : this.seguridad[0]["valor"] ,Validators.required],
      biomecanicoFactorRiesgoOcupacional4: [data ? data.biomecanicoFactorRiesgoOcupacional4 : this.biomecanico[0]["valor"] ,Validators.required],
      psicosocialFactorRiesgoOcupacional4: [data ? data.psicosocialFactorRiesgoOcupacional4 : this.psicosocial[0]["valor"] ,Validators.required],
      observacionesAntecedentesOcupacional: [data ? data.observacionesAntecedentesOcupacional : ''],
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
    let dataRecovery = localStorage.getItem("medicinaAntecedentesOcupacionales");
    dataRecovery = dataRecovery ? JSON.parse(dataRecovery) : dataRecovery;

    this.currentPage = this.getCurrentPageUrl();
    this.obtenerAnexosService.getAnexos(["fisico","biologico","quimico","seguridad","biomecanico","psicosocial"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.fisico = this.formatear_datos(response.fisico)
        this.biologico = this.formatear_datos(response.biologico)
        this.quimico = this.formatear_datos(response.quimico)
        this.seguridad = this.formatear_datos(response.seguridad)
        this.biomecanico = this.formatear_datos(response.biomecanico)
        this.psicosocial = this.formatear_datos(response.psicosocial)

        this.inputs$ = of([
          { id: "fisicoFactorRiesgoOcupacional1", nombre: "Dermatológico", for: "fisicoFactorRiesgoOcupacional1", options: this.fisico},
          { id: "biologicoFactorRiesgoOcupacional1", nombre: "Osteomuscular", for: "biologicoFactorRiesgoOcupacional1", options: this.biologico},
          { id: "quimicoFactorRiesgoOcupacional1", nombre: "Osteoarticular", for: "quimicoFactorRiesgoOcupacional1", options: this.quimico},
          { id: "seguridadFactorRiesgoOcupacional1", nombre: "Genitourinario", for: "seguridadFactorRiesgoOcupacional1", options: this.seguridad},
          { id: "biomecanicoFactorRiesgoOcupacional1", nombre: "Metabólico", for: "biomecanicoFactorRiesgoOcupacional1", options: this.biomecanico},
          { id: "psicosocialFactorRiesgoOcupacional1", nombre: "Neurológico", for: "psicosocialFactorRiesgoOcupacional1", options: this.psicosocial},
          { id: "fisicoFactorRiesgoOcupacional2", nombre: "Dermatológico", for: "fisicoFactorRiesgoOcupacional2", options: this.fisico},
          { id: "biologicoFactorRiesgoOcupacional2", nombre: "Osteomuscular", for: "biologicoFactorRiesgoOcupacional2", options: this.biologico},
          { id: "quimicoFactorRiesgoOcupacional2", nombre: "Osteoarticular", for: "quimicoFactorRiesgoOcupacional2", options: this.quimico},
          { id: "seguridadFactorRiesgoOcupacional2", nombre: "Genitourinario", for: "seguridadFactorRiesgoOcupacional2", options: this.seguridad},
          { id: "biomecanicoFactorRiesgoOcupacional2", nombre: "Metabólico", for: "biomecanicoFactorRiesgoOcupacional2", options: this.biomecanico},
          { id: "psicosocialFactorRiesgoOcupacional2", nombre: "Neurológico", for: "psicosocialFactorRiesgoOcupacional2", options: this.psicosocial},
          { id: "fisicoFactorRiesgoOcupacional3", nombre: "Dermatológico", for: "fisicoFactorRiesgoOcupacional3", options: this.fisico},
          { id: "biologicoFactorRiesgoOcupacional3", nombre: "Osteomuscular", for: "biologicoFactorRiesgoOcupacional3", options: this.biologico},
          { id: "quimicoFactorRiesgoOcupacional3", nombre: "Osteoarticular", for: "quimicoFactorRiesgoOcupacional3", options: this.quimico},
          { id: "seguridadFactorRiesgoOcupacional3", nombre: "Genitourinario", for: "seguridadFactorRiesgoOcupacional3", options: this.seguridad},
          { id: "biomecanicoFactorRiesgoOcupacional3", nombre: "Metabólico", for: "biomecanicoFactorRiesgoOcupacional3", options: this.biomecanico},
          { id: "psicosocialFactorRiesgoOcupacional3", nombre: "Neurológico", for: "psicosocialFactorRiesgoOcupacional3", options: this.psicosocial},
          { id: "fisicoFactorRiesgoOcupacional4", nombre: "Dermatológico", for: "fisicoFactorRiesgoOcupacional4", options: this.fisico},
          { id: "biologicoFactorRiesgoOcupacional4", nombre: "Osteomuscular", for: "biologicoFactorRiesgoOcupacional4", options: this.biologico},
          { id: "quimicoFactorRiesgoOcupacional4", nombre: "Osteoarticular", for: "quimicoFactorRiesgoOcupacional4", options: this.quimico},
          { id: "seguridadFactorRiesgoOcupacional4", nombre: "Genitourinario", for: "seguridadFactorRiesgoOcupacional4", options: this.seguridad},
          { id: "biomecanicoFactorRiesgoOcupacional4", nombre: "Metabólico", for: "biomecanicoFactorRiesgoOcupacional4", options: this.biomecanico},
          { id: "psicosocialFactorRiesgoOcupacional4", nombre: "Neurológico", for: "psicosocialFactorRiesgoOcupacional4", options: this.psicosocial},
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
    localStorage.setItem("medicinaAntecedentesOcupacionales", JSON.stringify(data));
  }
}
