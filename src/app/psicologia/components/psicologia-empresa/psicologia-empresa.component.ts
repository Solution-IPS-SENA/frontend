import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { delay, filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    { id: "gestionOrganizacional", nombre: "Gestion organizacional", for: "gestionOrganizacional", options: this.sino},
    { id: "caracteristicasOrganizacion", nombre: "Caracteristicas de la organizacion", for: "caracteristicasOrganizacion",  options: this.sino },
    { id: "condicionTarea", nombre: "Condicion de la tarea", for: "condicionTarea",  options: this.sino },
    { id: "caracteristicasGrupoTrabajo", nombre: "Caracteristicas del grupo de trabajo", for: "caracteristicasGrupoTrabajo",  options: this.sino },
    { id: "interfacePersonaTarea", nombre: "Interface persona - Tarea", for: "interfacePersonaTarea",  options: this.sino },
    { id: "jornadaTrabajo", nombre: "Jornada de trabajo", for: "jornadaTrabajo",  options: this.sino },
    { id: "condicionMedioAmbienteTrabajo", nombre: "Condicion medio ambiente de trabajo", for: "condicionMedioAmbienteTrabajo", options: this.medioAmbiente},
    { id: "carga", nombre: "Carga", for: "carga", options: this.carga},
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
        gestionOrganizacional: [data ? data.gestionOrganizacional : this.sino[0]["valor"], Validators.required],
        caracteristicasOrganizacion: [data ? data.caracteristicasOrganizacion : this.sino[0]["valor"], Validators.required],
        condicionTarea: [data ? data.condicionTarea : this.sino[0]["valor"] ,Validators.required],
        caracteristicasGrupoTrabajo: [data ? data.caracteristicasGrupoTrabajo : this.sino[0]["valor"] ,Validators.required],
        interfacePersonaTarea: [data ? data.interfacePersonaTarea :this.sino[0]["valor"], Validators.required],
        jornadaTrabajo: [data ? data.jornadaTrabajo : this.sino[0]["valor"] ,Validators.required],
        condicionMedioAmbienteTrabajo: [data ? data.condicionMedioAmbienteTrabajo :this.medioAmbiente[0]["valor"], Validators.required],
        carga: [data ? data.carga : this.carga[0]["valor"], Validators.required],
        observacionesEmpresa: [data ? data.observacionesEmpresa : '',],
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
          { id: "gestionOrganizacional", nombre: "Gestion organizacional", for: "gestionOrganizacional", options: this.sino},
          { id: "caracteristicasOrganizacion", nombre: "Caracteristicas de la organizacion", for: "caracteristicasOrganizacion",  options: this.sino },
          { id: "condicionTarea", nombre: "Condicion de la tarea", for: "condicionTarea",  options: this.sino },
          { id: "caracteristicasGrupoTrabajo", nombre: "Caracteristicas del grupo de trabajo", for: "caracteristicasGrupoTrabajo",  options: this.sino },
          { id: "interfacePersonaTarea", nombre: "Interface persona - Tarea", for: "interfacePersonaTarea",  options: this.sino },
          { id: "jornadaTrabajo", nombre: "Jornada de trabajo", for: "jornadaTrabajo",  options: this.sino },
          { id: "condicionMedioAmbienteTrabajo", nombre: "Condicion medio ambiente de trabajo", for: "condicionMedioAmbienteTrabajo", options: this.medioAmbiente},
          { id: "carga", nombre: "Carga", for: "carga", options: this.carga},
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
    localStorage.setItem("psicologiaEmpresa", JSON.stringify(data));
  }
}