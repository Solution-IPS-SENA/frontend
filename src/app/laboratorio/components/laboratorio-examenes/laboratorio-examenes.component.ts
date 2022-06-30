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
    { id: "hema", nombre: "Cuadro hemático", for: "hema", options: this.normalidad},
    { id: "glice", nombre: "Glicemia", for: "glice", options: this.normalidad},
    { id: "colestot", nombre: "Colesterol total", for: "colestot", options: this.normalidad},
    { id: "coleshdl", nombre: "Colesterol hdl", for: "coleshdl", options: this.normalidad},
    { id: "colesldl", nombre: "Colesterol ldl", for: "colesldl", options: this.normalidad},
    { id: "trigli", nombre: "Triglicéridos", for: "trigli", options: this.normalidad},
    { id: "parcori", nombre: "Parcial de orina", for: "parcori", options: this.normalidad},
    { id: "culori", nombre: "Cultivo de orina", for: "culori", options: this.normalidad},
    { id: "copro", nombre: "Coprológico", for: "copro", options: this.normalidad},
    { id: "frotsisfar", nombre: "Frotis faríngeo", for: "frotsisfar", options: this.normalidad},
    { id: "cultifar", nombre: "Cultivo faríngeo", for: "cultifar", options: this.normalidad},
    { id: "koh", nombre: "KOH", for: "koh", options: this.normalidad},
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
      hema: [data ? data.hema : this.normalidad[0]["valor"] , [Validators.required, inAnexoValidator(this.normalidad)]],
      glice: [data ? data.glice : this.normalidad[0]["valor"] , [Validators.required, inAnexoValidator(this.normalidad)]],
      colestot: [data ? data.colestot : this.normalidad[0]["valor"] ,[Validators.required, inAnexoValidator(this.normalidad)]],
      coleshdl: [data ? data.coleshdl : this.normalidad[0]["valor"] ,[Validators.required, inAnexoValidator(this.normalidad)]],
      colesldl: [data ? data.colesldl : this.normalidad[0]["valor"] ,[Validators.required, inAnexoValidator(this.normalidad)]],
      trigli: [data ? data.trigli : this.normalidad[0]["valor"], [Validators.required, inAnexoValidator(this.normalidad)]],
      parcori: [data ? data.parcori : this.normalidad[0]["valor"], [Validators.required, inAnexoValidator(this.normalidad)]],
      culori: [data ? data.culori : this.normalidad[0]["valor"], [Validators.required, inAnexoValidator(this.normalidad)]],
      copro: [data ? data.copro : this.normalidad[0]["valor"], [Validators.required, inAnexoValidator(this.normalidad)]],
      frotsisfar: [data ? data.frotsisfar : this.normalidad[0]["valor"], [Validators.required, inAnexoValidator(this.normalidad)]],
      cultifar: [data ? data.cultifar : this.normalidad[0]["valor"], [Validators.required, inAnexoValidator(this.normalidad)]],
      koh: [data ? data.koh : this.normalidad[0]["valor"], [Validators.required, inAnexoValidator(this.normalidad)]],
      obser1_lab: [data ? data.obser1_lab : '']
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
          { id: "hema", nombre: "Cuadro hemático", for: "hema", options: this.normalidad},
          { id: "glice", nombre: "Glicemia", for: "glice", options: this.normalidad},
          { id: "colestot", nombre: "Colesterol total", for: "colestot", options: this.normalidad},
          { id: "coleshdl", nombre: "Colesterol hdl", for: "coleshdl", options: this.normalidad},
          { id: "colesldl", nombre: "Colesterol ldl", for: "colesldl", options: this.normalidad},
          { id: "trigli", nombre: "Triglicéridos", for: "trigli", options: this.normalidad},
          { id: "parcori", nombre: "Parcial de orina", for: "parcori", options: this.normalidad},
          { id: "culori", nombre: "Cultivo de orina", for: "culori", options: this.normalidad},
          { id: "copro", nombre: "Coprológico", for: "copro", options: this.normalidad},
          { id: "frotsisfar", nombre: "Frotis faríngeo", for: "frotsisfar", options: this.normalidad},
          { id: "cultifar", nombre: "Cultivo faríngeo", for: "cultifar", options: this.normalidad},
          { id: "koh", nombre: "KOH", for: "koh", options: this.normalidad},
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
