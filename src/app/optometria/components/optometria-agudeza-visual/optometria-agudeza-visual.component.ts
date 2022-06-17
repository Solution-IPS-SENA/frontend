import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay, filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { InputDatosDoble } from 'src/app/shared/interfaces/input-datos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-optometria-agudeza-visual',
  templateUrl: './optometria-agudeza-visual.component.html',
  styleUrls: ['./optometria-agudeza-visual.component.css']
})
export class OptometriaAgudezaVisualComponent implements OnInit, OnDestroy {

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

  tiempo = [];
  sino = [];
  lensometria = [];
  agudezaVisual = [];

  loaded$ = of(false);


  inputsAVCerca$?: Observable<InputDatosDoble[]> = of([
    { id: "ojoDerechoCerca", nombre: "OD", for: "ojoDerechoCercaSC", for2:"ojoDerechoCercaCC", options: this.agudezaVisual, options2: this.agudezaVisual },
    { id: "ojoIzquierdoCerca", nombre: "OI",for: "ojoIzquierdoCercaSC", for2:"ojoIzquierdoCercaCC", options: this.agudezaVisual, options2: this.agudezaVisual },
    { id: "ambosCerca", nombre: "AMBOS",for: "ambosCercaSC", for2:"ambosCercaCC",  options: this.agudezaVisual, options2: this.agudezaVisual },
  ]);
  inputsAVLejos$?: Observable<InputDatosDoble[]> = of([
    { id: "ojoDerechoLejos", nombre: "OD", for: "ojoDerechoLejosSC", for2:"ojoDerechoLejosCC", options: this.agudezaVisual, options2: this.agudezaVisual },
    { id: "ojoIzquierdoLejos", nombre: "OI",for: "ojoIzquierdoLejosSC", for2:"ojoIzquierdoLejosCC", options: this.agudezaVisual, options2: this.agudezaVisual },
    { id: "ambosLejos", nombre: "AMBOS", for: "ambosLejosSC", for2:"ambosLejosCC", options: this.agudezaVisual, options2: this.agudezaVisual },
  ]);
  inputsLensometria$?: Observable<InputDatosDoble[]> = of([
    { id: "ojoDerechoLensometria", nombre: "OD", for: "prescripcionOjoDerecho", for2:"valorPrescripcionOjoDerecho", options: this.sino, options2: this.lensometria },
    { id: "ojoIzquierdoLensometria", nombre: "OI", for: "prescripcionOjoIzquierdo", for2:"valorPrescripcionOjoIzquierdo", options: this.sino, options2: this.lensometria },
    { id: "tiempoUsoLensometria", for:"tiempoUsoLensometria", nombre: "Tiempo de uso", options: this.tiempo },
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
        ojoDerechoCercaSC: [data ? data.ojoDerechoCercaSC : this.agudezaVisual[0]["valor"], Validators.required],
        ojoDerechoCercaCC: [data ? data.ojoDerechoCercaCC :this.agudezaVisual[0]["valor"], Validators.required],
        ojoIzquierdoCercaSC: [data ? data.ojoIzquierdoCercaSC : this.agudezaVisual[0]["valor"] ,Validators.required],
        ojoIzquierdoCercaCC: [data ? data.ojoIzquierdoCercaCC : this.agudezaVisual[0]["valor"] ,Validators.required],
        ambosCercaSC: [data ? data.ambosCercaSC :this.agudezaVisual[0]["valor"], Validators.required],
        ambosCercaCC: [data ? data.ambosCercaCC : this.agudezaVisual[0]["valor"] ,Validators.required],
        ojoDerechoLejosSC: [data ? data.ojoDerechoLejosSC :this.agudezaVisual[0]["valor"], Validators.required],
        ojoDerechoLejosCC: [data ? data.ojoDerechoLejosCC : this.agudezaVisual[0]["valor"], Validators.required],
        ojoIzquierdoLejosSC: [data ? data.ojoIzquierdoLejosSC : this.agudezaVisual[0]["valor"], Validators.required],
        ojoIzquierdoLejosCC: [data ? data.ojoIzquierdoLejosCC :this.agudezaVisual[0]["valor"], Validators.required],
        ambosLejosSC: [data ? data.ambosLejosSC : this.agudezaVisual[0]["valor"] ,Validators.required],
        ambosLejosCC: [data ? data.ambosLejosCC : this.agudezaVisual[0]["valor"] ,Validators.required],
        prescripcionOjoDerecho: [data ? data.prescripcionOjoDerecho :this.sino[0]["valor"], Validators.required],
        valorPrescripcionOjoDerecho: [data ? data.valorPrescripcionOjoDerecho : this.lensometria[0]["valor"] ,Validators.required],
        prescripcionOjoIzquierdo: [data ? data.prescripcionOjoIzquierdo :this.sino[0]["valor"], Validators.required],
        valorPrescripcionOjoIzquierdo: [data ? data.valorPrescripcionOjoIzquierdo : this.lensometria[0]["valor"], Validators.required],
        tiempoUsoLensometria: [data ? data.tiempoUsoLensometria :this.tiempo[0]["valor"], Validators.required]
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
    let dataRecovery = localStorage.getItem("optometriaAgudezaVisual");
    dataRecovery = dataRecovery ? JSON.parse(dataRecovery) : dataRecovery;

    this.currentPage = this.getCurrentPageUrl();
    this.obtenerAnexosService.getAnexos(["lensometria", "tiempo", "agudezaVisual", "sino"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.tiempo = this.formatear_datos(response.tiempo);
        this.lensometria = this.formatear_datos(response.lensometria);
        this.agudezaVisual = this.formatear_datos(response.agudezaVisual);
        this.sino = this.formatear_datos(response.sino);

        this.inputsAVCerca$ = of([
          { id: "ojoDerechoCerca", nombre: "OD", for: "ojoDerechoCercaSC", for2:"ojoDerechoCercaCC", options: this.agudezaVisual, options2: this.agudezaVisual },
          { id: "ojoIzquierdoCerca", nombre: "OI",for: "ojoIzquierdoCercaSC", for2:"ojoIzquierdoCercaCC", options: this.agudezaVisual, options2: this.agudezaVisual },
          { id: "ambosCerca", nombre: "AMBOS",for: "ambosCercaSC", for2:"ambosCercaCC",  options: this.agudezaVisual, options2: this.agudezaVisual },
        ]);
        this.inputsAVLejos$ = of([
          { id: "ojoDerechoLejos", nombre: "OD", for: "ojoDerechoLejosSC", for2:"ojoDerechoLejosCC", options: this.agudezaVisual, options2: this.agudezaVisual },
          { id: "ojoIzquierdoLejos", nombre: "OI",for: "ojoIzquierdoLejosSC", for2:"ojoIzquierdoLejosCC", options: this.agudezaVisual, options2: this.agudezaVisual },
          { id: "ambosLejos", nombre: "AMBOS", for: "ambosLejosSC", for2:"ambosLejosCC", options: this.agudezaVisual, options2: this.agudezaVisual },
        ]);

        this.inputsLensometria$= of([
          { id: "ojoDerechoLensometria", nombre: "OD", for: "prescripcionOjoDerecho", for2:"valorPrescripcionOjoDerecho", options: this.sino, options2: this.lensometria },
          { id: "ojoIzquierdoLensometria", nombre: "OI", for: "prescripcionOjoIzquierdo", for2:"valorPrescripcionOjoIzquierdo", options: this.sino, options2: this.lensometria },
          { id: "tiempoUsoLensometria", for:"tiempoUsoLensometria", nombre: "Tiempo de uso", options: this.tiempo },
        ]);

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
    localStorage.setItem("optometriaAgudezaVisual", JSON.stringify(data));
  }
}