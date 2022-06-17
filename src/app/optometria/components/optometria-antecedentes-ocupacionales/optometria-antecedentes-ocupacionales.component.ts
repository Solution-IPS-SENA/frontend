import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { delay, filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-optometria-antecedentes-ocupacionales',
  templateUrl: './optometria-antecedentes-ocupacionales.component.html',
  styleUrls: ['./optometria-antecedentes-ocupacionales.component.css']
})
export class OptometriaAntecedentesOcupacionalesComponent implements OnInit, OnDestroy {

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
    { id: "exposicionVideoTerminales", nombre: "Exposicion a video - terminales", for: "exposicionVideoTerminales",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "accidenteOcular", nombre: "Accidente Ocular", for: "accidenteOcular",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "temperaturasExtremas", nombre: "Temperaturas extremas", for: "temperaturasExtremas",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "materialParticulado", nombre: "Material particulado", for: "materialParticulado",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "radiacionNoIonizante", nombre: "Radiacion no Ionizante", for: "radiacionNoIonizante",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "radiacionIonizante", nombre: "Radiacion Ionizante", for: "radiacionIonizante",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "exposicionQuimicos", nombre: "Exposicion a quimicos", for: "exposicionQuimicos",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "exposicionSolventes", nombre: "Exposicion a solventes", for: "exposicionSolventes",img:"../../../../assets/logos/026.JPG", options: this.sino },
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
        exposicionVideoTerminales: [data ? data.exposicionVideoTerminales : this.sino[0]["valor"], Validators.required],
        accidenteOcular: [data ? data.accidenteOcular : this.sino[0]["valor"], Validators.required],
        temperaturasExtremas: [data ? data.temperaturasExtremas : this.sino[0]["valor"] ,Validators.required],
        materialParticulado: [data ? data.materialParticulado : this.sino[0]["valor"] ,Validators.required],
        radiacionNoIonizante: [data ? data.radiacionNoIonizante :this.sino[0]["valor"], Validators.required],
        radiacionIonizante: [data ? data.radiacionIonizante : this.sino[0]["valor"] ,Validators.required],
        exposicionQuimicos: [data ? data.exposicionQuimicos :this.sino[0]["valor"], Validators.required],
        exposicionSolventes: [data ? data.exposicionSolventes : this.sino[0]["valor"], Validators.required],
        observacionesAntecedentesOcupacionales: [data ? data.observacionesAntecedentesOcupacionales :'']
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
    let dataRecovery = localStorage.getItem("optometriaAntecedentesOcupacionales");
    dataRecovery = dataRecovery ? JSON.parse(dataRecovery) : dataRecovery;

    this.currentPage = this.getCurrentPageUrl();
    this.obtenerAnexosService.getAnexos(["sino"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.sino = this.formatear_datos(response.sino)

        this.inputs$ = of([
          { id: "exposicionVideoTerminales", nombre: "Exposicion a video - terminales", for: "exposicionVideoTerminales",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "accidenteOcular", nombre: "Accidente Ocular", for: "accidenteOcular",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "temperaturasExtremas", nombre: "Temperaturas extremas", for: "temperaturasExtremas",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "materialParticulado", nombre: "Material particulado", for: "materialParticulado",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "radiacionNoIonizante", nombre: "Radiacion no Ionizante", for: "radiacionNoIonizante",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "radiacionIonizante", nombre: "Radiacion Ionizante", for: "radiacionIonizante",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "exposicionQuimicos", nombre: "Exposicion a quimicos", for: "exposicionQuimicos",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "exposicionSolventes", nombre: "Exposicion a solventes", for: "exposicionSolventes",img:"../../../../assets/logos/026.JPG", options: this.sino },
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
    localStorage.setItem("optometriaAntecedentesOcupacionales", JSON.stringify(data));
  }
}