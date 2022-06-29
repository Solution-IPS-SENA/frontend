import { Component, OnInit, OnDestroy} from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { delay, filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inAnexoValidator } from 'src/app/shared/validators/in-anexo.validator';

@Component({
  selector: 'app-medicina-datos-ocupacionales',
  templateUrl: './medicina-datos-ocupacionales.component.html',
  styleUrls: ['./medicina-datos-ocupacionales.component.css']
})
export class MedicinaDatosOcupacionalesComponent implements OnInit, OnDestroy {

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

  equiposUtilizados = [];
  riesgosLaborales = [];
  institucion = [];

  loaded$ = of(false);

  inputsCondicionesActualesCargo$?: Observable<InputDatos[]> = of([
    { id: "ocu_equi", nombre: "Equipos utilizados", type: "select", for: "ocu_equi", options: this.equiposUtilizados},
    { id: "ocu_acti", nombre: "Actividad principal realizada", type: "text", for: "ocu_acti" },
  ]);

  inputNumber$?: Observable<any> = of([
    { id: "1"},
    { id: "2"},
  ]);

  inputsAccidentesEnfermedadesLaborales1$?: Observable<InputDatos[]> = of([
    { id: "ocu_acc_emp1", nombre: "Empresa", type: "text", for: "ocu_acc_emp1" },
    { id: "ocu_acc_diag1", nombre: "Diagnostico", type: "text", for: "ocu_acc_diag1" },
  ]);

  inputsAccidentesEnfermedadesLaborales2$?: Observable<InputDatos[]> = of([
    { id: "empresa2", nombre: "Empresa", type: "text", for: "empresa2" },
    { id: "diagnostico2", nombre: "Diagnostico", type: "text", for: "diagnostico2" },
  ]);

  inputsEmpresa1$?: Observable<InputDatos[]> = of([
    { id: "select1Emp1", nombre: "Empresa1", for:"select1Emp1", type:"select", options: this.riesgosLaborales},
    { id: "select2Emp1", nombre: "Empresa1", for:"select2Emp1", type:"date"},
    { id: "select3Emp1", nombre: "Empresa1", for:"select3Emp1", type:"select", options: this.institucion}
  ]);

  inputsEmpresa2$?: Observable<InputDatos[]> = of([
    { id: "select1Emp2", nombre: "Empresa2", for:"select1Emp2", type:"select", options: this.riesgosLaborales},
    { id: "select2Emp2", nombre: "Empresa2", for:"select2Emp2", type:"date"},
    { id: "select3Emp2", nombre: "Empresa2", for:"select3Emp2", type:"select", options: this.institucion}
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
      ocu_equi: [data ? data.ocu_equi : this.equiposUtilizados[0]["valor"] , [Validators.required, inAnexoValidator(this.equiposUtilizados)]],
      ocu_acti: [data ? data.ocu_acti : ''],
      ocu_acc_emp1: [data ? data.ocu_acc_emp1 : ''],
      ocu_acc_diag1: [data ? data.ocu_acc_diag1 : ''],
      ocu_acc_emp2: [data ? data.ocu_acc_emp2 : ''],
      ocu_acc_diag2: [data ? data.ocu_acc_diag2 : ''],
      select1Emp1: [data ? data.select1Emp1 : this.riesgosLaborales[0]["valor"] , [Validators.required, inAnexoValidator(this.riesgosLaborales)]],
      select2Emp1: [data ? data.select2Emp1 : ''],
      select3Emp1: [data ? data.select3Emp1 : this.institucion[0]["valor"] ,[Validators.required, inAnexoValidator(this.institucion)]],
      select1Emp2: [data ? data.select1Emp2 : this.riesgosLaborales[0]["valor"] ,[Validators.required, inAnexoValidator(this.riesgosLaborales)]],
      select2Emp2: [data ? data.select2Emp2 : ''],
      select3Emp2: [data ? data.select3Emp2 : this.institucion[0]["valor"] ,[Validators.required, inAnexoValidator(this.institucion)]]
    });
  }

  ngOnInit(): void {
    let dataRecovery = localStorage.getItem("medicinaDatosOcupacionales");
    dataRecovery = dataRecovery ? JSON.parse(dataRecovery) : dataRecovery;

    this.currentPage = this.getCurrentPageUrl();
    this.obtenerAnexosService.getAnexos(["equiposUtilizados","riesgosLaborales","institucion"]).subscribe(
      (response: InformacionAnexos) => {
        this.equiposUtilizados = this.obtenerAnexosService.formatear_datos(response.equiposUtilizados)
        this.riesgosLaborales = this.obtenerAnexosService.formatear_datos(response.riesgosLaborales)
        this.institucion = this.obtenerAnexosService.formatear_datos(response.institucion)

        this.inputsCondicionesActualesCargo$ = of([
          { id: "ocu_equi", nombre: "Equipos utilizados", type: "select", for: "ocu_equi", options: this.equiposUtilizados},
          { id: "ocu_acti", nombre: "Actividad principal realizada", type: "text", for: "ocu_acti" },
        ]);

        this.inputNumber$ = of([
          { id: "1"},
          { id: "2"},
        ]);

        this.inputsAccidentesEnfermedadesLaborales1$ = of([
          { id: "ocu_acc_emp1", nombre: "Empresa", type: "text", for: "ocu_acc_emp1" },
          { id: "ocu_acc_diag1", nombre: "Diagnostico", type: "text", for: "ocu_acc_diag1" },
        ]);

        this.inputsAccidentesEnfermedadesLaborales2$ = of([
          { id: "ocu_acc_emp2", nombre: "Empresa", type: "text", for: "ocu_acc_emp2" },
          { id: "ocu_acc_diag2", nombre: "Diagnostico", type: "text", for: "ocu_acc_diag2" },
        ]);

        this.inputsEmpresa1$ = of([
          { id: "select1Emp1", nombre: "Empresa1", for:"select1Emp1", type:"select", options: this.riesgosLaborales},
          { id: "select2Emp1", nombre: "Empresa1", for:"select2Emp1", type:"date"},
          { id: "select3Emp1", nombre: "Empresa1", for:"select3Emp1", type:"select", options: this.institucion}
        ]);

        this.inputsEmpresa2$ = of([
          { id: "select1Emp2", nombre: "Empresa2", for:"select1Emp2", type:"select", options: this.riesgosLaborales},
          { id: "select2Emp2", nombre: "Empresa2", for:"select2Emp2", type:"date"},
          { id: "select3Emp2", nombre: "Empresa2", for:"select3Emp2", type:"select", options: this.institucion}
        ]);

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
    localStorage.setItem("medicinaDatosOcupacionales", JSON.stringify(data));
  }
}
