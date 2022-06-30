import { Component, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { delay, filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inAnexoValidator } from 'src/app/shared/validators/in-anexo.validator';
@Component({
  selector: 'app-laboratorio-examenes2',
  templateUrl: './laboratorio-examenes2.component.html',
  styleUrls: ['./laboratorio-examenes2.component.css']
})
export class LaboratorioExamenes2Component implements OnInit {

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
    { id: "tsh", nombre: "Tsh", for: "tsh", options: this.normalidad},
    { id: "creatinina", nombre: "Creatinina", for: "creatinina", options: this.normalidad},
    { id: "pruebasFuncionHepatica", nombre: "Pruebas función hepática", for: "pruebasFuncionHepatica", options: this.normalidad},
    { id: "proteinaCReactiva", nombre: "Proteina C reactiva", for: "proteinaCReactiva", options: this.normalidad},
    { id: "tiempoProtrombina", nombre: "Pt (Tiempo de protrombina)", for: "tiempoProtrombina", options: this.normalidad},
    { id: "tiempoParcialTromboplastina", nombre: "Ptt (Tiempo parcial de tromboplastina)", for: "tiempoParcialTromboplastina", options: this.normalidad},
    { id: "aciuri", nombre: "Ácido úrico", for: "aciuri", options: this.normalidad},
    { id: "antigenoProstatico", nombre: "Antigeno prostático", for: "antigenoProstatico", options: this.normalidad},
    { id: "gasarte", nombre: "Gases arteriales", for: "gasarte", options: this.normalidad},
    { id: "vdrl", nombre: "Vdrl", for: "vdrl", options: this.normalidad},
    { id: "gravi", nombre: "Gravidez", for: "gravi", options: this.normalidad},
    { id: "otro", nombre: "Otro", for: "otro", options: this.normalidad},
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
      tsh: [data ? data.tsh : this.normalidad[0]["valor"] , [Validators.required, inAnexoValidator(this.normalidad)]],
      creatinina: [data ? data.creatinina : this.normalidad[0]["valor"] , [Validators.required, inAnexoValidator(this.normalidad)]],
      pruebasFuncionHepatica: [data ? data.pruebasFuncionHepatica : this.normalidad[0]["valor"] ,[Validators.required, inAnexoValidator(this.normalidad)]],
      proteinaCReactiva: [data ? data.proteinaCReactiva : this.normalidad[0]["valor"] ,[Validators.required, inAnexoValidator(this.normalidad)]],
      tiempoProtrombina: [data ? data.tiempoProtrombina : this.normalidad[0]["valor"] ,[Validators.required, inAnexoValidator(this.normalidad)]],
      tiempoParcialTromboplastina: [data ? data.tiempoParcialTromboplastina : this.normalidad[0]["valor"], [Validators.required, inAnexoValidator(this.normalidad)]],
      aciuri: [data ? data.aciuri : this.normalidad[0]["valor"], [Validators.required, inAnexoValidator(this.normalidad)]],
      antigenoProstatico: [data ? data.antigenoProstatico : this.normalidad[0]["valor"], [Validators.required, inAnexoValidator(this.normalidad)]],
      gasarte: [data ? data.gasarte : this.normalidad[0]["valor"], [Validators.required, inAnexoValidator(this.normalidad)]],
      vdrl: [data ? data.vdrl : this.normalidad[0]["valor"], [Validators.required, inAnexoValidator(this.normalidad)]],
      gravi: [data ? data.gravi : this.normalidad[0]["valor"], [Validators.required, inAnexoValidator(this.normalidad)]],
      otro: [data ? data.otro : this.normalidad[0]["valor"], [Validators.required, inAnexoValidator(this.normalidad)]],
      obser2_lab: [data ? data.obser2_lab : '']
    });
  }

  ngOnInit(): void {
    let dataRecovery = localStorage.getItem("laboratorioExamenes2");
    dataRecovery = dataRecovery ? JSON.parse(dataRecovery) : dataRecovery;

    this.currentPage = this.getCurrentPageUrl();
    this.currentPage = this.getCurrentPageUrl();
    this.obtenerAnexosService.getAnexos(["normalidad"]).subscribe(
      (response: InformacionAnexos) => {
        this.normalidad = this.obtenerAnexosService.formatear_datos(response.normalidad)

        this.inputs$ = of([
          { id: "tsh", nombre: "Tsh", for: "tsh", options: this.normalidad},
          { id: "creatinina", nombre: "Creatinina", for: "creatinina", options: this.normalidad},
          { id: "pruebasFuncionHepatica", nombre: "Pruebas función hepática", for: "pruebasFuncionHepatica", options: this.normalidad},
          { id: "proteinaCReactiva", nombre: "Proteina C reactiva", for: "proteinaCReactiva", options: this.normalidad},
          { id: "tiempoProtrombina", nombre: "Pt (Tiempo de protrombina)", for: "tiempoProtrombina", options: this.normalidad},
          { id: "tiempoParcialTromboplastina", nombre: "Ptt (Tiempo parcial de tromboplastina)", for: "tiempoParcialTromboplastina", options: this.normalidad},
          { id: "aciuri", nombre: "Ácido úrico", for: "aciuri", options: this.normalidad},
          { id: "antigenoProstatico", nombre: "Antigeno prostático", for: "antigenoProstatico", options: this.normalidad},
          { id: "gasarte", nombre: "Gases arteriales", for: "gasarte", options: this.normalidad},
          { id: "vdrl", nombre: "Vdrl", for: "vdrl", options: this.normalidad},
          { id: "gravi", nombre: "Gravidez", for: "gravi", options: this.normalidad},
          { id: "otro", nombre: "Otro", for: "otro", options: this.normalidad},
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
    localStorage.setItem("laboratorioExamenes2", JSON.stringify(data));
  }
}

