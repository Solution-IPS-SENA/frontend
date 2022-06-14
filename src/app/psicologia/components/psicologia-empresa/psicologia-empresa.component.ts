import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { delay, filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inAnexoValidator } from 'src/app/shared/validators/in-anexo.validator';

@Component({
  selector: 'app-psicologia-empresa',
  templateUrl: './psicologia-empresa.component.html',
  styleUrls: ['./psicologia-empresa.component.css']
})
export class PsicologiaEmpresaComponent implements OnInit, OnDestroy {

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
  medioAmbiente = [];
  carga = [];

  loaded$ = of(false);

  inputs$?: Observable<InputDatos[]> = of([
    { id: "ries_emp_gest_org", nombre: "Gestion organizacional", for: "ries_emp_gest_org", options: this.sino},
    { id: "ries_emp_carac_org", nombre: "Caracteristicas de la organizacion", for: "ries_emp_carac_org",  options: this.sino },
    { id: "ries_emp_tare", nombre: "Condicion de la tarea", for: "ries_emp_tare",  options: this.sino },
    { id: "ries_emp_grup", nombre: "Caracteristicas del grupo de trabajo", for: "ries_emp_grup",  options: this.sino },
    { id: "ries_emp_interf", nombre: "Interface persona - Tarea", for: "ries_emp_interf",  options: this.sino },
    { id: "ries_emp_jorna", nombre: "Jornada de trabajo", for: "ries_emp_jorna",  options: this.sino },
    { id: "ries_emp_cond", nombre: "Condicion medio ambiente de trabajo", for: "ries_emp_cond", options: this.medioAmbiente},
    { id: "ries_emp_carga", nombre: "Carga", for: "ries_emp_carga", options: this.carga},
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
        ries_emp_gest_org: [data ? data.ries_emp_gest_org : this.sino[0]["valor"], [Validators.required, inAnexoValidator(this.sino)]],
        ries_emp_carac_org: [data ? data.ries_emp_carac_org : this.sino[0]["valor"], [Validators.required, inAnexoValidator(this.sino)]],
        ries_emp_tare: [data ? data.ries_emp_tare : this.sino[0]["valor"] ,[Validators.required, inAnexoValidator(this.sino)]],
        ries_emp_grup: [data ? data.ries_emp_grup : this.sino[0]["valor"] ,[Validators.required, inAnexoValidator(this.sino)]],
        ries_emp_interf: [data ? data.ries_emp_interf :this.sino[0]["valor"], [Validators.required, inAnexoValidator(this.sino)]],
        ries_emp_jorna: [data ? data.ries_emp_jorna : this.sino[0]["valor"] ,[Validators.required, inAnexoValidator(this.sino)]],
        ries_emp_cond: [data ? data.ries_emp_cond :this.medioAmbiente[0]["valor"], [Validators.required, inAnexoValidator(this.medioAmbiente)]],
        ries_emp_carga: [data ? data.ries_emp_carga : this.carga[0]["valor"], [Validators.required, inAnexoValidator(this.carga)]],
        ries_emp_obs: [data ? data.ries_emp_obs : '',],
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
    let dataRecovery = localStorage.getItem("psicologiaEmpresa");
    dataRecovery = dataRecovery ? JSON.parse(dataRecovery) : dataRecovery;

    this.currentPage = this.getCurrentPageUrl();
    this.obtenerAnexosService.getAnexos(["sino", "medioAmbiente", "carga"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        console.log("Response:",response);
        if (!response) return;
        this.sino = this.formatear_datos(response.sino)
        this.medioAmbiente = this.formatear_datos(response.medioAmbiente)
        this.carga = this.formatear_datos(response.carga)

        this.inputs$ = of([
          { id: "ries_emp_gest_org", nombre: "Gestion organizacional", for: "ries_emp_gest_org", options: this.sino},
          { id: "ries_emp_carac_org", nombre: "Caracteristicas de la organizacion", for: "ries_emp_carac_org",  options: this.sino },
          { id: "ries_emp_tare", nombre: "Condicion de la tarea", for: "ries_emp_tare",  options: this.sino },
          { id: "ries_emp_grup", nombre: "Caracteristicas del grupo de trabajo", for: "ries_emp_grup",  options: this.sino },
          { id: "ries_emp_interf", nombre: "Interface persona - Tarea", for: "ries_emp_interf",  options: this.sino },
          { id: "ries_emp_jorna", nombre: "Jornada de trabajo", for: "ries_emp_jorna",  options: this.sino },
          { id: "ries_emp_cond", nombre: "Condicion medio ambiente de trabajo", for: "ries_emp_cond", options: this.medioAmbiente},
          { id: "ries_emp_carga", nombre: "Carga", for: "ries_emp_carga", options: this.carga},
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
    localStorage.setItem("psicologiaEmpresa", JSON.stringify(data));
  }
}
