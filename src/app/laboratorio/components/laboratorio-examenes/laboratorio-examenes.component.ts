import { Component, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { delay, filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inAnexoValidator } from 'src/app/shared/validators/in-anexo.validator';

@Component({
  selector: 'app-laboratorio-examenes',
  templateUrl: './laboratorio-examenes.component.html',
  styleUrls: ['./laboratorio-examenes.component.css']
})
export class LaboratorioExamenesComponent implements OnInit {

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

  normalidad = [];
  loaded$ = of(false);

  inputs$?: Observable<InputDatos[]> = of([
    { id: "cuadroHematico", nombre: "Cuadro hematico", for: "cuadroHematico", options: this.normalidad},
    { id: "glicemia", nombre: "Glicemia", for: "glicemia", options: this.normalidad},
    { id: "colesterolTotal", nombre: "Colesterol total", for: "colesterolTotal", options: this.normalidad},
    { id: "colesterolHDL", nombre: "Colesterol hdl", for: "colesterolHDL", options: this.normalidad},
    { id: "colesterolLDL", nombre: "Colesterol ldl", for: "colesterolLDL", options: this.normalidad},
    { id: "trigliceridos", nombre: "Trigliceridos", for: "trigliceridos", options: this.normalidad},
    { id: "parcialOrina", nombre: "Parcial de orina", for: "parcialOrina", options: this.normalidad},
    { id: "cultivoOrina", nombre: "Cultivo de orina", for: "cultivoOrina", options: this.normalidad},
    { id: "coprologico", nombre: "Coprologico", for: "coprologico", options: this.normalidad},
    { id: "frotisFaringeo", nombre: "Frotis faringeo", for: "frotisFaringeo", options: this.normalidad},
    { id: "cultivoFaringeo", nombre: "Cultivo faringeo", for: "cultivoFaringeo", options: this.normalidad},
    { id: "koh", nombre: "Koh", for: "koh", options: this.normalidad},
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
      cuadroHematico: [data ? data.cuadroHematico : this.normalidad[0]["valor"] , [Validators.required, inAnexoValidator(this.normalidad)]],
      glicemia: [data ? data.glicemia : this.normalidad[0]["valor"] , [Validators.required, inAnexoValidator(this.normalidad)]],
      colesterolTotal: [data ? data.colesterolTotal : this.normalidad[0]["valor"] ,[Validators.required, inAnexoValidator(this.normalidad)]],
      colesterolHDL: [data ? data.colesterolHDL : this.normalidad[0]["valor"] ,[Validators.required, inAnexoValidator(this.normalidad)]],
      colesterolLDL: [data ? data.colesterolLDL : this.normalidad[0]["valor"] ,[Validators.required, inAnexoValidator(this.normalidad)]],
      trigliceridos: [data ? data.trigliceridos : this.normalidad[0]["valor"], [Validators.required, inAnexoValidator(this.normalidad)]],
      parcialOrina: [data ? data.parcialOrina : this.normalidad[0]["valor"], [Validators.required, inAnexoValidator(this.normalidad)]],
      cultivoOrina: [data ? data.cultivoOrina : this.normalidad[0]["valor"], [Validators.required, inAnexoValidator(this.normalidad)]],
      coprologico: [data ? data.coprologico : this.normalidad[0]["valor"], [Validators.required, inAnexoValidator(this.normalidad)]],
      frotisFaringeo: [data ? data.frotisFaringeo : this.normalidad[0]["valor"], [Validators.required, inAnexoValidator(this.normalidad)]],
      cultivoFaringeo: [data ? data.cultivoFaringeo : this.normalidad[0]["valor"], [Validators.required, inAnexoValidator(this.normalidad)]],
      koh: [data ? data.koh : this.normalidad[0]["valor"], [Validators.required, inAnexoValidator(this.normalidad)]],
      obser1_labLaboratorio: [data ? data.obser1_labLaboratorio : '']
    });
  }

  ngOnInit(): void {
    let dataRecovery = localStorage.getItem("laboratorioExamenes1");
    dataRecovery = dataRecovery ? JSON.parse(dataRecovery) : dataRecovery;

    this.currentPage = this.getCurrentPageUrl();
    this.obtenerAnexosService.getAnexos(["normalidad"]).subscribe(
      (response: InformacionAnexos) => {
        this.normalidad = this.obtenerAnexosService.formatear_datos(response.normalidad)

        this.inputs$ = of([
          { id: "cuadroHematico", nombre: "Cuadro hematico", for: "cuadroHematico", options: this.normalidad},
          { id: "glicemia", nombre: "Glicemia", for: "glicemia", options: this.normalidad},
          { id: "colesterolTotal", nombre: "Colesterol total", for: "colesterolTotal", options: this.normalidad},
          { id: "colesterolHDL", nombre: "Colesterol hdl", for: "colesterolHDL", options: this.normalidad},
          { id: "colesterolLDL", nombre: "Colesterol ldl", for: "colesterolLDL", options: this.normalidad},
          { id: "trigliceridos", nombre: "Trigliceridos", for: "trigliceridos", options: this.normalidad},
          { id: "parcialOrina", nombre: "Parcial de orina", for: "parcialOrina", options: this.normalidad},
          { id: "cultivoOrina", nombre: "Cultivo de orina", for: "cultivoOrina", options: this.normalidad},
          { id: "coprologico", nombre: "Coprologico", for: "coprologico", options: this.normalidad},
          { id: "frotisFaringeo", nombre: "Frotis faringeo", for: "frotisFaringeo", options: this.normalidad},
          { id: "cultivoFaringeo", nombre: "Cultivo faringeo", for: "cultivoFaringeo", options: this.normalidad},
          { id: "koh", nombre: "Koh", for: "koh", options: this.normalidad},
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
    localStorage.setItem("laboratorioExamenes1", JSON.stringify(data));
  }
}
