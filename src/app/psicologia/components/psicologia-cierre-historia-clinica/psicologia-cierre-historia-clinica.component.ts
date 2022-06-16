import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { delay, filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inAnexoValidator } from 'src/app/shared/validators/in-anexo.validator';
import { EnvioHistoriaService } from 'src/app/shared/services/envio-historia.service';

@Component({
  selector: 'app-psicologia-cierre-historia-clinica',
  templateUrl: './psicologia-cierre-historia-clinica.component.html',
  styleUrls: ['./psicologia-cierre-historia-clinica.component.css']
})
export class PsicologiaCierreHistoriaClinicaComponent implements OnInit, OnDestroy {

  llavesData = ["psicologiaAccidentes","psicologiaEmpresa","psicologiaObservacion","psicologiaCierreHistoria"]
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

  remitido = [];
  concepto = [];
  motivo = [];

  loaded$ = of(false);

  inputs$?: Observable<InputDatos[]> = of([
    { id: "motivo", nombre: "Motivo", for: "motivo", options: this.motivo},
    { id: "cie_concep_reco_mot", nombre: "Remitido", for: "cie_concep_reco_mot", options: this.remitido},
  ]);

  inputConcepto$?: Observable<InputDatos[]> = of([
    { id: "concepto", nombre: "Concepto", for: "concepto", options: this.concepto},
  ]);

  public get lifecycle$() {
    return this.lifecycleSubj.asObservable();
  }

  constructor(
    private obtenerAnexosService: ObtenerAnexosService,
    private router: Router,
    private fb: FormBuilder,
    private envioHistoria: EnvioHistoriaService
  ) {}

  createForm(data?: any){
    this.form = this.fb.group({
      motivo: [data ? data.motivo : this.motivo[0]["valor"], [Validators.required, inAnexoValidator(this.motivo)]],
      cie_concep_reco_mot: [data ? data.cie_concep_reco_mot : this.remitido[0]["valor"], [Validators.required, inAnexoValidator(this.remitido)]],
      estado: [data ? data.estado : ''],
      concepto: [data ? data.concepto : this.concepto[0]["valor"] , [Validators.required, inAnexoValidator(this.concepto)]],
      histo_famili: [data ? data.histo_famili : '', Validators.required],
      cie_concep_reco: [data ? data.cie_concep_reco : '', Validators.required],
      cie_obs: [data ? data.cie_obs : '', Validators.required],
    });
  }

  ngOnInit(): void {
    let dataRecovery = localStorage.getItem("psicologiaCierreHistoria");
    dataRecovery = dataRecovery ? JSON.parse(dataRecovery) : dataRecovery;

    this.currentPage = this.getCurrentPageUrl();
    this.obtenerAnexosService.getAnexos(["motivo","concepto","remitido"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.motivo = this.obtenerAnexosService.formatear_datos(response.motivo)
        this.remitido = this.obtenerAnexosService.formatear_datos(response.remitido)
        this.concepto = this.obtenerAnexosService.formatear_datos(response.concepto)

        this.inputs$ = of([
          { id: "motivo", nombre: "Motivo", for: "motivo", options: this.motivo},
          { id: "cie_concep_reco_mot", nombre: "Remitido", for: "cie_concep_reco_mot", options: this.remitido},
        ])

        this.inputConcepto$ = of([
          { id: "concepto", nombre: "Concepto", for: "concepto", options: this.concepto},
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
    localStorage.setItem("psicologiaCierreHistoria", JSON.stringify(data));
    alert("Sisas")
    this.envioHistoria.enviarHistoria(this.llavesData)
  }
}

