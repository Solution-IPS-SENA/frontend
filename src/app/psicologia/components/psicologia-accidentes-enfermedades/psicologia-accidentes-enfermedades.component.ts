import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { delay, filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inAnexoValidator } from 'src/app/shared/validators/in-anexo.validator';

@Component({
  selector: 'app-psicologia-accidentes-enfermedades',
  templateUrl: './psicologia-accidentes-enfermedades.component.html',
  styleUrls: ['./psicologia-accidentes-enfermedades.component.css']
})
export class PsicologiaAccidentesEnfermedadesComponent implements OnInit, OnDestroy {

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

  sino = [];
  loaded$ = of(false);

  inputs$?: Observable<InputDatos[]> = of([
    { id: "ant_tra", nombre: "Ha estado en consulta o tratamiento psicologico o psiquiatrico:", for: "ant_tra", options: this.sino },
    { id: "ant_enf", nombre: "Ha sufrido enfermedades psicologicas laborales o derivadas del estres laboral:", for: "ant_enf", options: this.sino},
    { id: "ant_sueño", nombre: "Presenta alteraciones del sueño:", for: "ant_sueño",  options: this.sino},
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
        ant_tra: [data ? data.ant_tra : this.sino[0]["valor"], [Validators.required, inAnexoValidator(this.sino)]],
        ant_enf: [data ? data.ant_enf : this.sino[0]["valor"], [Validators.required, inAnexoValidator(this.sino)]],
        ant_sueño: [data ? data.ant_sueño : this.sino[0]["valor"] ,[Validators.required, inAnexoValidator(this.sino)]]
      });
    }

  ngOnInit(): void {
    let dataRecovery = localStorage.getItem("psicologiaAccidentes");
    dataRecovery = dataRecovery ? JSON.parse(dataRecovery) : dataRecovery;

    this.currentPage = this.getCurrentPageUrl();
    this.obtenerAnexosService.getAnexos(["sino"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.sino = this.obtenerAnexosService.formatear_datos(response.sino)

        this.inputs$ = of([
          { id: "ant_tra", nombre: "Ha estado en consulta o tratamiento psicologico o psiquiatrico:", for: "ant_tra", options: this.sino },
          { id: "ant_enf", nombre: "Ha sufrido enfermedades psicologicas laborales o derivadas del estres laboral:", for: "ant_enf", options: this.sino},
          { id: "ant_sueño", nombre: "Presenta alteraciones del sueño:", for: "ant_sueño",  options: this.sino},
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
    localStorage.setItem("psicologiaAccidentes", JSON.stringify(data));
  }
}
