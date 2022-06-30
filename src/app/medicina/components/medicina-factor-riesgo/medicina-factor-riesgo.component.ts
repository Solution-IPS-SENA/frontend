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
    { id: "rie_exp_fis_1", nombre: "Dermatológico1", for: "rie_exp_fis_1", options: this.fisico},
    { id: "rie_exp_bio_1", nombre: "Osteomuscular1", for: "rie_exp_bio_1", options: this.biologico},
    { id: "rie_exp_quim_1", nombre: "Osteoarticular1", for: "rie_exp_quim_1", options: this.quimico},
    { id: "rie_exp_seg_1", nombre: "Genitourinario1", for: "rie_exp_seg_1", options: this.seguridad},
    { id: "rie_exp_biom_1", nombre: "Metabólico1", for: "rie_exp_biom_1", options: this.biomecanico},
    { id: "rie_exp_psico_1", nombre: "Neurológico1", for: "rie_exp_psico_1", options: this.psicosocial},
    { id: "rie_exp_fis_2", nombre: "Dermatológico2", for: "rie_exp_fis_2", options: this.fisico},
    { id: "rie_exp_bio_2", nombre: "Osteomuscular2", for: "rie_exp_bio_2", options: this.biologico},
    { id: "rie_exp_quim_2", nombre: "Osteoarticular2", for: "rie_exp_quim_2", options: this.quimico},
    { id: "rie_exp_seg_2", nombre: "Genitourinario2", for: "rie_exp_seg_2", options: this.seguridad},
    { id: "rie_exp_biom_2", nombre: "Metabólico2", for: "rie_exp_biom_2", options: this.biomecanico},
    { id: "rie_exp_psico_2", nombre: "Neurológico2", for: "rie_exp_psico_2", options: this.psicosocial},
    { id: "rie_exp_fis_3", nombre: "Dermatológico3", for: "rie_exp_fis_3", options: this.fisico},
    { id: "rie_exp_bio_3", nombre: "Osteomuscular3", for: "rie_exp_bio_3", options: this.biologico},
    { id: "rie_exp_quim_3", nombre: "Osteoarticular3", for: "rie_exp_quim_3", options: this.quimico},
    { id: "rie_exp_seg_3", nombre: "Genitourinario3", for: "rie_exp_seg_3", options: this.seguridad},
    { id: "rie_exp_biom_3", nombre: "Metabólico3", for: "rie_exp_biom_3", options: this.biomecanico},
    { id: "rie_exp_psico_3", nombre: "Neurológico3", for: "rie_exp_psico_3", options: this.psicosocial},
    { id: "rie_exp_fis_4", nombre: "Dermatológico4", for: "rie_exp_fis_4", options: this.fisico},
    { id: "rie_exp_bio_4", nombre: "Osteomuscular4", for: "rie_exp_bio_4", options: this.biologico},
    { id: "rie_exp_quim_4", nombre: "Osteoarticular4", for: "rie_exp_quim_4", options: this.quimico},
    { id: "rie_exp_seg_4", nombre: "Genitourinario4", for: "rie_exp_seg_4", options: this.seguridad},
    { id: "rie_exp_biom_4", nombre: "Metabólico4", for: "rie_exp_biom_4", options: this.biomecanico},
    { id: "rie_exp_psico_4", nombre: "Neurológico4", for: "rie_exp_psico_4", options: this.psicosocial},
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
      rie_exp_fis_1: [data ? data.rie_exp_fis_1 : this.fisico[0]["valor"] , [Validators.required, inAnexoValidator(this.fisico)]],
      rie_exp_bio_1: [data ? data.rie_exp_bio_1 : this.biologico[0]["valor"] , [Validators.required, inAnexoValidator(this.biologico)]],
      rie_exp_quim_1: [data ? data.rie_exp_quim_1 : this.quimico[0]["valor"] ,[Validators.required, inAnexoValidator(this.quimico)]],
      rie_exp_seg_1: [data ? data.rie_exp_seg_1 : this.seguridad[0]["valor"] ,[Validators.required, inAnexoValidator(this.seguridad)]],
      rie_exp_biom_1: [data ? data.rie_exp_biom_1 : this.biomecanico[0]["valor"] ,[Validators.required, inAnexoValidator(this.biomecanico)]],
      rie_exp_psico_1: [data ? data.rie_exp_psico_1 : this.psicosocial[0]["valor"] ,[Validators.required, inAnexoValidator(this.psicosocial)]],
      rie_exp_fis_2: [data ? data.rie_exp_fis_2 : this.fisico[0]["valor"] , [Validators.required, inAnexoValidator(this.fisico)]],
      rie_exp_bio_2: [data ? data.rie_exp_bio_2 : this.biologico[0]["valor"] , [Validators.required, inAnexoValidator(this.biologico)]],
      rie_exp_quim_2: [data ? data.rie_exp_quim_2 : this.quimico[0]["valor"] ,[Validators.required, inAnexoValidator(this.quimico)]],
      rie_exp_seg_2: [data ? data.rie_exp_seg_2 : this.seguridad[0]["valor"] ,[Validators.required, inAnexoValidator(this.seguridad)]],
      rie_exp_biom_2: [data ? data.rie_exp_biom_2 : this.biomecanico[0]["valor"] ,[Validators.required, inAnexoValidator(this.biomecanico)]],
      rie_exp_psico_2: [data ? data.rie_exp_psico_2 : this.psicosocial[0]["valor"] ,[Validators.required, inAnexoValidator(this.psicosocial)]],
      rie_exp_fis_3: [data ? data.rie_exp_fis_3 : this.fisico[0]["valor"] , [Validators.required, inAnexoValidator(this.fisico)]],
      rie_exp_bio_3: [data ? data.rie_exp_bio_3 : this.biologico[0]["valor"] , [Validators.required, inAnexoValidator(this.biologico)]],
      rie_exp_quim_3: [data ? data.rie_exp_quim_3 : this.quimico[0]["valor"] ,[Validators.required, inAnexoValidator(this.quimico)]],
      rie_exp_seg_3: [data ? data.rie_exp_seg_3 : this.seguridad[0]["valor"] ,[Validators.required, inAnexoValidator(this.seguridad)]],
      rie_exp_biom_3: [data ? data.rie_exp_biom_3 : this.biomecanico[0]["valor"] ,[Validators.required, inAnexoValidator(this.biomecanico)]],
      rie_exp_psico_3: [data ? data.rie_exp_psico_3 : this.psicosocial[0]["valor"] ,[Validators.required, inAnexoValidator(this.psicosocial)]],
      rie_exp_fis_4: [data ? data.rie_exp_fis_4 : this.fisico[0]["valor"] , [Validators.required, inAnexoValidator(this.fisico)]],
      rie_exp_bio_4: [data ? data.rie_exp_bio_4 : this.biologico[0]["valor"] , [Validators.required, inAnexoValidator(this.biologico)]],
      rie_exp_quim_4: [data ? data.rie_exp_quim_4 : this.quimico[0]["valor"] ,[Validators.required, inAnexoValidator(this.quimico)]],
      rie_exp_seg_4: [data ? data.rie_exp_seg_4 : this.seguridad[0]["valor"] ,[Validators.required, inAnexoValidator(this.seguridad)]],
      rie_exp_biom_4: [data ? data.rie_exp_biom_4 : this.biomecanico[0]["valor"] ,[Validators.required, inAnexoValidator(this.biomecanico)]],
      rie_exp_psico_4: [data ? data.rie_exp_psico_4 : this.psicosocial[0]["valor"] ,[Validators.required, inAnexoValidator(this.psicosocial)]],
      rie_exp_obs: [data ? data.rie_exp_obs : ''],
    });
  }

  ngOnInit(): void {
    let dataRecovery = localStorage.getItem("medicinaFactores");
    dataRecovery = dataRecovery ? JSON.parse(dataRecovery) : dataRecovery;

    this.currentPage = this.getCurrentPageUrl();
    this.obtenerAnexosService.getAnexos(["fisico","biologico","quimico","seguridad","biomecanico","psicosocial"]).subscribe(
      (response: InformacionAnexos) => {
        this.fisico = this.obtenerAnexosService.formatear_datos(response.fisico)
        this.biologico = this.obtenerAnexosService.formatear_datos(response.biologico)
        this.quimico = this.obtenerAnexosService.formatear_datos(response.quimico)
        this.seguridad = this.obtenerAnexosService.formatear_datos(response.seguridad)
        this.biomecanico = this.obtenerAnexosService.formatear_datos(response.biomecanico)
        this.psicosocial = this.obtenerAnexosService.formatear_datos(response.psicosocial)

        this.inputs$ = of([
          { id: "rie_exp_fis_1", nombre: "Dermatológico1", for: "rie_exp_fis_1", options: this.fisico},
          { id: "rie_exp_bio_1", nombre: "Osteomuscular1", for: "rie_exp_bio_1", options: this.biologico},
          { id: "rie_exp_quim_1", nombre: "Osteoarticular1", for: "rie_exp_quim_1", options: this.quimico},
          { id: "rie_exp_seg_1", nombre: "Genitourinario1", for: "rie_exp_seg_1", options: this.seguridad},
          { id: "rie_exp_biom_1", nombre: "Metabólico1", for: "rie_exp_biom_1", options: this.biomecanico},
          { id: "rie_exp_psico_1", nombre: "Neurológico1", for: "rie_exp_psico_1", options: this.psicosocial},
          { id: "rie_exp_fis_2", nombre: "Dermatológico2", for: "rie_exp_fis_2", options: this.fisico},
          { id: "rie_exp_bio_2", nombre: "Osteomuscular2", for: "rie_exp_bio_2", options: this.biologico},
          { id: "rie_exp_quim_2", nombre: "Osteoarticular2", for: "rie_exp_quim_2", options: this.quimico},
          { id: "rie_exp_seg_2", nombre: "Genitourinario2", for: "rie_exp_seg_2", options: this.seguridad},
          { id: "rie_exp_biom_2", nombre: "Metabólico2", for: "rie_exp_biom_2", options: this.biomecanico},
          { id: "rie_exp_psico_2", nombre: "Neurológico2", for: "rie_exp_psico_2", options: this.psicosocial},
          { id: "rie_exp_fis_3", nombre: "Dermatológico3", for: "rie_exp_fis_3", options: this.fisico},
          { id: "rie_exp_bio_3", nombre: "Osteomuscular3", for: "rie_exp_bio_3", options: this.biologico},
          { id: "rie_exp_quim_3", nombre: "Osteoarticular3", for: "rie_exp_quim_3", options: this.quimico},
          { id: "rie_exp_seg_3", nombre: "Genitourinario3", for: "rie_exp_seg_3", options: this.seguridad},
          { id: "rie_exp_biom_3", nombre: "Metabólico3", for: "rie_exp_biom_3", options: this.biomecanico},
          { id: "rie_exp_psico_3", nombre: "Neurológico3", for: "rie_exp_psico_3", options: this.psicosocial},
          { id: "rie_exp_fis_4", nombre: "Dermatológico4", for: "rie_exp_fis_4", options: this.fisico},
          { id: "rie_exp_bio_4", nombre: "Osteomuscular4", for: "rie_exp_bio_4", options: this.biologico},
          { id: "rie_exp_quim_4", nombre: "Osteoarticular4", for: "rie_exp_quim_4", options: this.quimico},
          { id: "rie_exp_seg_4", nombre: "Genitourinario4", for: "rie_exp_seg_4", options: this.seguridad},
          { id: "rie_exp_biom_4", nombre: "Metabólico4", for: "rie_exp_biom_4", options: this.biomecanico},
          { id: "rie_exp_psico_4", nombre: "Neurológico4", for: "rie_exp_psico_4", options: this.psicosocial},
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
