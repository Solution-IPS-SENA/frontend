import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay, filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { ObtenerAnexosService } from 'src/app/shared/services/obtener-anexos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-optometria-antecedentes-personales',
  templateUrl: './optometria-antecedentes-personales.component.html',
  styleUrls: ['./optometria-antecedentes-personales.component.css']
})
export class OptometriaAntecedentesPersonalesComponent implements OnInit, OnDestroy {

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

  sino: any = [];
  loaded$ = of(false);

  inputs$?: Observable<InputDatos[]> = of([
    { id: "defectosRefractivos", nombre: "Defectos refractivos", for: "defectosRefractivos", img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "cxOcular", nombre: "CX Ocular", for: "cxOcular", img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "estrabismos", nombre: "Estrabismos", for: "estrabismos", img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "patologiasOculares", nombre: "Patologias oculares", for: "patologiasOculares",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "ttoOrtoptico", nombre: "TTO ortoptico", for: "ttoOrtoptico",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "hipertensionArterial", nombre: "Hipertension arterial", for: "hipertensionArterial",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "diabetesMellitus", nombre: "Diabetes mellitus", for: "diabetesMellitus",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "desordenesTiroides", nombre: "Desordenes tiroides", for: "desordenesTiroides",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "observacionesAntecedentesPersonalesOpto", nombre: "Observaciones", for: "observacionesAntecedentesPersonalesOpto",img:"../../../../assets/logos/003.jpg" },
    { id: "accidenteCerebroVascular", nombre: "Accidente cerebro vascular", for: "accidenteCerebroVascular",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "traumaCraneoEncefalico", nombre: "Trauma craneo encefalico", for: "traumaCraneoEncefalico",img:"../../../../assets/logos/026.JPG", options: this.sino },
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
        defectosRefractivos: [data ? data.defectosRefractivos : this.sino[0]["valor"], Validators.required],
        cxOcular: [data ? data.cxOcular : this.sino[0]["valor"], Validators.required],
        estrabismos: [data ? data.estrabismos : this.sino[0]["valor"] ,Validators.required],
        patologiasOculares: [data ? data.patologiasOculares : this.sino[0]["valor"] ,Validators.required],
        ttoOrtoptico: [data ? data.ttoOrtoptico : this.sino[0]["valor"] ,Validators.required],
        hipertensionArterial: [data ? data.hipertensionArterial : this.sino[0]["valor"], Validators.required],
        diabetesMellitus: [data ? data.diabetesMellitus :this.sino[0]["valor"], Validators.required],
        desordenesTiroides: [data ? data.desordenesTiroides : this.sino[0]["valor"] ,Validators.required],
        observacionesAntecedentesPersonalesOpto: [data ? data.observacionesAntecedentesPersonalesOpto : '' ],
        accidenteCerebroVascular: [data ? data.accidenteCerebroVascular : this.sino[0]["valor"], Validators.required],
        traumaCraneoEncefalico: [data ? data.traumaCraneoEncefalico : this.sino[0]["valor"], Validators.required],
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
    let dataRecovery = localStorage.getItem("OptometriaAntecedentesPersonales");
    dataRecovery = dataRecovery ? JSON.parse(dataRecovery) : dataRecovery;

    this.currentPage = this.getCurrentPageUrl();
    this.obtenerAnexosService.getAnexos(["sino"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.sino = this.formatear_datos(response.sino)

        this.inputs$ = of([
          { id: "defectosRefractivos", nombre: "Defectos refractivos", for: "defectosRefractivos", img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "cxOcular", nombre: "CX Ocular", for: "cxOcular", img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "estrabismos", nombre: "Estrabismos", for: "estrabismos", img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "patologiasOculares", nombre: "Patologias oculares", for: "patologiasOculares",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "ttoOrtoptico", nombre: "TTO ortoptico", for: "ttoOrtoptico",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "hipertensionArterial", nombre: "Hipertension arterial", for: "hipertensionArterial",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "diabetesMellitus", nombre: "Diabetes mellitus", for: "diabetesMellitus",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "desordenesTiroides", nombre: "Desordenes tiroides", for: "desordenesTiroides",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "observacionesAntecedentesPersonalesOpto", nombre: "Observaciones", for: "observacionesAntecedentesPersonalesOpto",img:"../../../../assets/logos/003.jpg" },
          { id: "accidenteCerebroVascular", nombre: "Accidente cerebro vascular", for: "accidenteCerebroVascular",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "traumaCraneoEncefalico", nombre: "Trauma craneo encefalico", for: "traumaCraneoEncefalico",img:"../../../../assets/logos/026.JPG", options: this.sino },
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
    localStorage.setItem("OptometriaAntecedentesPersonales", JSON.stringify(data));
  }
}
