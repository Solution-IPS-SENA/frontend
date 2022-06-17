import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay, filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { inAnexoValidator } from 'src/app/shared/validators/in-anexo.validator';

@Component({
  selector: 'app-optometria-agudeza-visual',
  templateUrl: './optometria-agudeza-visual.component.html',
  styleUrls: ['./optometria-agudeza-visual.component.css']
})
export class OptometriaAgudezaVisualComponent implements OnInit, OnDestroy {

  public currentPage = 0;
  form!: FormGroup;
  state: boolean = false;
  private lifecycleSubj: Subject<string> = new Subject<string>();

  public onPageChange(currentPage: number) {
    this.router.navigate(['/historias', 'optometria', currentPage]).then(() => {
      this.currentPage = this.getCurrentPageUrl();
    });
  }

  public getCurrentPageUrl(): number {
    const urlSegments = this.router.url.split('/');
    return parseInt(urlSegments[urlSegments.length - 1] ?? '0');
  }

  tiempo = [];
  sino = [];
  lensometria = [];
  agudezaVisual = [];

  loaded$ = of(false);


  inputsAVCerca$?: Observable<InputDatos[]> = of([
    { id: "ojoDerechoCerca", nombre: "OD", for: "agu_cer_sc1", for2:"agu_cer_cc1", options: this.agudezaVisual, options2: this.agudezaVisual },
    { id: "ojoIzquierdoCerca", nombre: "OI",for: "agu_cer_sc2", for2:"agu_cer_cc2", options: this.agudezaVisual, options2: this.agudezaVisual },
    { id: "ambosCerca", nombre: "AMBOS",for: "agu_cer_sc3", for2:"agu_cer_cc3",  options: this.agudezaVisual, options2: this.agudezaVisual },
  ]);
  inputsAVLejos$?: Observable<InputDatos[]> = of([
    { id: "ojoDerechoLejos", nombre: "OD", for: "agu_lej_sc1", for2:"agu_lej_cc1", options: this.agudezaVisual, options2: this.agudezaVisual },
    { id: "ojoIzquierdoLejos", nombre: "OI",for: "agu_lej_sc2", for2:"agu_lej_cc2", options: this.agudezaVisual, options2: this.agudezaVisual },
    { id: "ambosLejos", nombre: "AMBOS", for: "agu_lej_sc3", for2:"agu_lej_cc3", options: this.agudezaVisual, options2: this.agudezaVisual },
  ]);
  inputsLensometria$?: Observable<InputDatos[]> = of([
    { id: "ojoDerechoLensometria", nombre: "OD", for: "agu_len_pre_od1", for2:"agu_len_pre_od2", options: this.sino, options2: this.lensometria },
    { id: "ojoIzquierdoLensometria", nombre: "OI", for: "agu_len_pre_oi1", for2:"agu_len_pre_oi2", options: this.sino, options2: this.lensometria },
    { id: "agu_len_tiem", for:"agu_len_tiem", nombre: "Tiempo de uso", options: this.tiempo },
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
        agu_cer_sc1: [data ? data.agu_cer_sc1 : this.agudezaVisual[0]["valor"], [Validators.required, inAnexoValidator(this.agudezaVisual)]],
        agu_cer_cc1: [data ? data.agu_cer_cc1 :this.agudezaVisual[0]["valor"], [Validators.required, inAnexoValidator(this.agudezaVisual)]],
        agu_cer_sc2: [data ? data.agu_cer_sc2 : this.agudezaVisual[0]["valor"] ,[Validators.required, inAnexoValidator(this.agudezaVisual)]],
        agu_cer_cc2: [data ? data.agu_cer_cc2 : this.agudezaVisual[0]["valor"] ,[Validators.required, inAnexoValidator(this.agudezaVisual)]],
        agu_cer_sc3: [data ? data.agu_cer_sc3 :this.agudezaVisual[0]["valor"], [Validators.required, inAnexoValidator(this.agudezaVisual)]],
        agu_cer_cc3: [data ? data.agu_cer_cc3 : this.agudezaVisual[0]["valor"] ,[Validators.required, inAnexoValidator(this.agudezaVisual)]],
        agu_lej_sc1: [data ? data.agu_lej_sc1 :this.agudezaVisual[0]["valor"], [Validators.required, inAnexoValidator(this.agudezaVisual)]],
        agu_lej_cc1: [data ? data.agu_lej_cc1 : this.agudezaVisual[0]["valor"], [Validators.required, inAnexoValidator(this.agudezaVisual)]],
        agu_lej_sc2: [data ? data.agu_lej_sc2 : this.agudezaVisual[0]["valor"], [Validators.required, inAnexoValidator(this.agudezaVisual)]],
        agu_lej_cc2: [data ? data.agu_lej_cc2 :this.agudezaVisual[0]["valor"], [Validators.required, inAnexoValidator(this.agudezaVisual)]],
        agu_lej_sc3: [data ? data.agu_lej_sc3 : this.agudezaVisual[0]["valor"] ,[Validators.required, inAnexoValidator(this.agudezaVisual)]],
        agu_lej_cc3: [data ? data.agu_lej_cc3 : this.agudezaVisual[0]["valor"] ,[Validators.required, inAnexoValidator(this.agudezaVisual)]],
        agu_len_pre_od1: [data ? data.agu_len_pre_od1 :this.sino[0]["valor"], [Validators.required, inAnexoValidator(this.sino)]],
        agu_len_pre_od2: [data ? data.agu_len_pre_od2 : this.lensometria[0]["valor"] ,[Validators.required, inAnexoValidator(this.lensometria)]],
        agu_len_pre_oi1: [data ? data.agu_len_pre_oi1 :this.sino[0]["valor"], [Validators.required, inAnexoValidator(this.sino)]],
        agu_len_pre_oi2: [data ? data.agu_len_pre_oi2 : this.lensometria[0]["valor"], [Validators.required, inAnexoValidator(this.lensometria)]],
        agu_len_tiem: [data ? data.agu_len_tiem :this.tiempo[0]["valor"], [Validators.required, inAnexoValidator(this.tiempo)]]
      });
    }

  ngOnInit(): void {
    let dataRecovery = localStorage.getItem("optometriaAgudezaVisual");
    dataRecovery = dataRecovery ? JSON.parse(dataRecovery) : dataRecovery;

    this.currentPage = this.getCurrentPageUrl();
    this.obtenerAnexosService.getAnexos(["lensometria", "tiempo", "agudezaVisual", "sino"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.tiempo = this.obtenerAnexosService.formatear_datos(response.tiempo);
        this.lensometria = this.obtenerAnexosService.formatear_datos(response.lensometria);
        this.agudezaVisual = this.obtenerAnexosService.formatear_datos(response.agudezaVisual);
        this.sino = this.obtenerAnexosService.formatear_datos(response.sino);

        this.inputsAVCerca$ = of([
          { id: "ojoDerechoCerca", nombre: "OD", for: "agu_cer_sc1", for2:"agu_cer_cc1", options: this.agudezaVisual, options2: this.agudezaVisual },
          { id: "ojoIzquierdoCerca", nombre: "OI",for: "agu_cer_sc2", for2:"agu_cer_cc2", options: this.agudezaVisual, options2: this.agudezaVisual },
          { id: "ambosCerca", nombre: "AMBOS",for: "agu_cer_sc3", for2:"agu_cer_cc3",  options: this.agudezaVisual, options2: this.agudezaVisual },
        ]);
        this.inputsAVLejos$ = of([
          { id: "ojoDerechoLejos", nombre: "OD", for: "agu_lej_sc1", for2:"agu_lej_cc1", options: this.agudezaVisual, options2: this.agudezaVisual },
          { id: "ojoIzquierdoLejos", nombre: "OI",for: "agu_lej_sc2", for2:"agu_lej_cc2", options: this.agudezaVisual, options2: this.agudezaVisual },
          { id: "ambosLejos", nombre: "AMBOS", for: "agu_lej_sc3", for2:"agu_lej_cc3", options: this.agudezaVisual, options2: this.agudezaVisual },
        ]);

        this.inputsLensometria$= of([
          { id: "ojoDerechoLensometria", nombre: "OD", for: "agu_len_pre_od1", for2:"agu_len_pre_od2", options: this.sino, options2: this.lensometria },
          { id: "ojoIzquierdoLensometria", nombre: "OI", for: "agu_len_pre_oi1", for2:"agu_len_pre_oi2", options: this.sino, options2: this.lensometria },
          { id: "agu_len_tiem", for:"agu_len_tiem", nombre: "Tiempo de uso", options: this.tiempo },
        ]);

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
    localStorage.setItem("optometriaAgudezaVisual", JSON.stringify(data));
  }
}
