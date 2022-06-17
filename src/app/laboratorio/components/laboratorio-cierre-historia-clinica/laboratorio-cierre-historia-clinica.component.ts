import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { delay, filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnvioHistoriaService } from 'src/app/shared/services/envio-historia.service';

@Component({
  selector: 'app-laboratorio-cierre-historia-clinica',
  templateUrl: './laboratorio-cierre-historia-clinica.component.html',
  styleUrls: ['./laboratorio-cierre-historia-clinica.component.css']
})
export class LaboratorioCierreHistoriaClinicaComponent implements OnInit, OnDestroy {

  llavesData = ["laboratorioExamenes1","laboratorioExamenes2","laboratorioCierreHistoria"]

  public currentPage = 0;
  form!: FormGroup;
  state: boolean = false;
  private lifecycleSubj: Subject<string> = new Subject<string>();

  public onPageChange(currentPage: number) {
    this.router.navigate(['/historias', 'laboratorio', currentPage]).then(() => {
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
    { id: "remitido", nombre: "Remitido", for: "remitido", options: this.remitido},
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
      motivo: [data ? data.motivo : this.motivo[0]["valor"]],
      remitido: [data ? data.remitido : this.remitido[0]["valor"]],
      checkboxAplazado: [data ? data.checkboxAplazado : ''],
      concepto: [data ? data.concepto : this.concepto[0]["valor"] , Validators.required],
      laboratorioHistoriaFamiliar: [data ? data.laboratorioHistoriaFamiliar : '', Validators.required],
      laboratorioRestricciones: [data ? data.laboratorioRestricciones : '', Validators.required],
      laboratorioObservaciones: [data ? data.laboratorioObservaciones : '', Validators.required],
    });
  }

  ngOnInit(): void {
    let dataRecovery = localStorage.getItem("laboratorioCierreHistoria");
    dataRecovery = dataRecovery ? JSON.parse(dataRecovery) : dataRecovery;

    this.currentPage = this.getCurrentPageUrl();
    this.obtenerAnexosService.getAnexos(["motivo","concepto","remitido"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.motivo = this.obtenerAnexosService.formatear_datos(response.motivo)
        this.remitido = this.obtenerAnexosService.formatear_datos(response.remitido)
        this.concepto = this.obtenerAnexosService.formatear_datos(response.concepto)

        this.inputs$ = of([
          { id: "motivo", nombre: "Motivo", for: "motivo", options: this.motivo},
          { id: "remitido", nombre: "Remitido", for: "remitido", options: this.remitido},
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
    localStorage.setItem("laboratorioCierreHistoria", JSON.stringify(data));
    alert("Sisas")
    this.envioHistoria.enviarHistoria(this.llavesData)
  }
}
