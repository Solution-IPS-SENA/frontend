import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputDatosDoble } from 'src/app/shared/interfaces/input-datos';
import { delay, filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-optometria-hallazgos',
  templateUrl: './optometria-hallazgos.component.html',
  styleUrls: ['./optometria-hallazgos.component.css']
})
export class OptometriaHallazgosComponent implements OnInit, OnDestroy {

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

  normalidad: any = [];
  loaded$ = of(false);

  inputsHallazgo1$?: Observable<InputDatosDoble[]> = of([
    { id: "examenExterno", nombre: "Examen externo", for:"ojoDerechoExamenExterno", for2:"ojoIzquierdoExamenExterno", img:"../../../../assets/logos/026.JPG", options: this.normalidad, options2: this.normalidad},
    { id: "motilidadOcular", nombre: "Motilidad ocular" ,for:"ojoDerechoMotilidadOcular", for2:"ojoIzquierdoMotilidadOcular", img:"../../../../assets/logos/026.JPG", options: this.normalidad, options2: this.normalidad},
    { id: "oftalmoscopia", nombre: "Oftalmoscopia" ,for:"ojoDerechoOftalmoscopia", for2:"ojoIzquierdoOftalmoscopia", img:"../../../../assets/logos/026.JPG", options: this.normalidad, options2: this.normalidad},
    { id: "campoVisualConfrontacion", nombre: "Campo visual por confrontacion" ,for:"ojoDerechoCampoVisualConfrontacion", for2:"ojoIzquierdoCampoVisualConfrontacion", img:"../../../../assets/logos/026.JPG", options: this.normalidad, options2: this.normalidad},
  ]);

  inputsHallazgo2$?: Observable<InputDatosDoble[]> = of([
    { id: "Estereopsis", nombre: "Estereopsis" , for:"ojoDerechoEstereopsis", for2:"ojoIzquierdoEstereopsis", img:"../../../../assets/logos/026.JPG", options: this.normalidad, options2: this.normalidad},
    { id: "Percepcioncromatica", nombre: "Percepcion cromatica" , for:"ojoDerechoPercepcioncromatica", for2:"ojoIzquierdoPercepcioncromatica", img:"../../../../assets/logos/026.JPG",options: this.normalidad, options2: this.normalidad},
    { id: "observacionesOptoHallazgos", nombre: "Observaciones",img:"../../../../assets/logos/003.jpg"}
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
        ojoDerechoExamenExterno: [data ? data.ojoDerechoExamenExterno : this.normalidad[0]["valor"], Validators.required],
        ojoIzquierdoExamenExterno: [data ? data.ojoIzquierdoExamenExterno :this.normalidad[0]["valor"], Validators.required],
        ojoDerechoMotilidadOcular: [data ? data.ojoDerechoMotilidadOcular : this.normalidad[0]["valor"] ,Validators.required],
        ojoIzquierdoMotilidadOcular: [data ? data.ojoIzquierdoMotilidadOcular : this.normalidad[0]["valor"] ,Validators.required],
        ojoDerechoOftalmoscopia: [data ? data.ojoDerechoOftalmoscopia :this.normalidad[0]["valor"], Validators.required],
        ojoIzquierdoOftalmoscopia: [data ? data.ojoIzquierdoOftalmoscopia : this.normalidad[0]["valor"] ,Validators.required],
        ojoDerechoCampoVisualConfrontacion: [data ? data.ojoDerechoCampoVisualConfrontacion :this.normalidad[0]["valor"], Validators.required],
        ojoIzquierdoCampoVisualConfrontacion: [data ? data.ojoIzquierdoCampoVisualConfrontacion : this.normalidad[0]["valor"], Validators.required],
        ojoDerechoEstereopsis: [data ? data.ojoDerechoEstereopsis: this.normalidad[0]["valor"], Validators.required],
        ojoIzquierdoEstereopsis: [data ? data.ojoIzquierdoEstereopsis :this.normalidad[0]["valor"], Validators.required],
        ojoDerechoPercepcioncromatica: [data ? data.ojoDerechoPercepcioncromatica : this.normalidad[0]["valor"] ,Validators.required],
        ojoIzquierdoPercepcioncromatica: [data ? data.ojoIzquierdoPercepcioncromatica : this.normalidad[0]["valor"] ,Validators.required],
        observacionesOptoHallazgos: [data ? data.observacionesOptoHallazgos :'']
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
    let dataRecovery = localStorage.getItem("optometriaHallazgos");
    dataRecovery = dataRecovery ? JSON.parse(dataRecovery) : dataRecovery;

    this.currentPage = this.getCurrentPageUrl();
    this.obtenerAnexosService.getAnexos(["normalidad"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.normalidad = this.formatear_datos(response.normalidad)

        this.inputsHallazgo1$ = of([
          { id: "examenExterno", nombre: "Examen externo", for:"ojoDerechoExamenExterno", for2:"ojoIzquierdoExamenExterno", img:"../../../../assets/logos/026.JPG", options: this.normalidad, options2: this.normalidad},
          { id: "motilidadOcular", nombre: "Motilidad ocular" ,for:"ojoDerechoMotilidadOcular", for2:"ojoIzquierdoMotilidadOcular", img:"../../../../assets/logos/026.JPG", options: this.normalidad, options2: this.normalidad},
          { id: "oftalmoscopia", nombre: "Oftalmoscopia" ,for:"ojoDerechoOftalmoscopia", for2:"ojoIzquierdoOftalmoscopia", img:"../../../../assets/logos/026.JPG", options: this.normalidad, options2: this.normalidad},
          { id: "campoVisualConfrontacion", nombre: "Campo visual por confrontacion" ,for:"ojoDerechoCampoVisualConfrontacion", for2:"ojoIzquierdoCampoVisualConfrontacion", img:"../../../../assets/logos/026.JPG", options: this.normalidad, options2: this.normalidad},
        ])

        this.inputsHallazgo2$ = of([
          { id: "Estereopsis", nombre: "Estereopsis" , for:"ojoDerechoEstereopsis", for2:"ojoIzquierdoEstereopsis", img:"../../../../assets/logos/026.JPG", options: this.normalidad, options2: this.normalidad},
          { id: "Percepcioncromatica", nombre: "Percepcion cromatica" , for:"ojoDerechoPercepcioncromatica", for2:"ojoIzquierdoPercepcioncromatica", img:"../../../../assets/logos/026.JPG",options: this.normalidad, options2: this.normalidad},
          { id: "observacionesOptoHallazgos", nombre: "Observaciones",img:"../../../../assets/logos/003.jpg"}
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
    localStorage.setItem("optometriaHallazgos", JSON.stringify(data));
  }
}