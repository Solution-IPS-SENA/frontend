import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { delay, filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-optometria-sintomas',
  templateUrl: './optometria-sintomas.component.html',
  styleUrls: ['./optometria-sintomas.component.css']
})
export class OptometriaSintomasComponent implements OnInit, OnDestroy {

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
    { id: "malaVisionLejos", nombre: "Mala vision de lejos", for: "malaVisionLejos", img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "malaVisionCerca", nombre: "Mala vision de cerca", for: "malaVisionCerca", img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "cefalea", nombre: "Cefalea", for: "cefalea", img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "hiperemia", nombre: "Hiperemia", for: "hiperemia", img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "visionDoble", nombre: "Vision doble", for: "visionDoble", img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "vertigo", nombre: "Vertigo", for: "vertigo", img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "lagrimeo", nombre: "Lagrimeo", for: "lagrimeo", img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "mareo", nombre: "Mareo", for: "mareo", img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "observacionesSintomasOpto", nombre: "Otro", for: "observacionesSintomasOpto", img:"../../../../assets/logos/003.jpg"},
    { id: "Secrecion", nombre: "Secreción", for: "Secrecion",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "resequedadOcular", nombre: "Resequedad ocular", for: "resequedadOcular", img:"../../../../assets/logos/026.JPG", options: this.sino },
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
        malaVisionLejos: [data ? data.malaVisionLejos : this.sino[0]["valor"], Validators.required],
        malaVisionCerca: [data ? data.malaVisionCerca : this.sino[0]["valor"], Validators.required],
        cefalea: [data ? data.cefalea : this.sino[0]["valor"] ,Validators.required],
        hiperemia: [data ? data.hiperemia : this.sino[0]["valor"] ,Validators.required],
        visionDoble: [data ? data.visionDoble : this.sino[0]["valor"] ,Validators.required],
        vertigo: [data ? data.vertigo : this.sino[0]["valor"], Validators.required],
        lagrimeo: [data ? data.lagrimeo :this.sino[0]["valor"], Validators.required],
        mareo: [data ? data.mareo : this.sino[0]["valor"] ,Validators.required],
        observacionesSintomasOpto: [data ? data.observacionesSintomasOpto : '' ],
        Secrecion: [data ? data.Secrecion : this.sino[0]["valor"], Validators.required],
        resequedadOcular: [data ? data.resequedadOcular : this.sino[0]["valor"], Validators.required]
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
    let dataRecovery = localStorage.getItem("OptometriaSintomas");
    dataRecovery = dataRecovery ? JSON.parse(dataRecovery) : dataRecovery;

    this.currentPage = this.getCurrentPageUrl();
    this.obtenerAnexosService.getAnexos(["sino"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.sino = this.formatear_datos(response.sino)

        this.inputs$ = of([
          { id: "malaVisionLejos", nombre: "Mala vision de lejos", for: "malaVisionLejos", img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "malaVisionCerca", nombre: "Mala vision de cerca", for: "malaVisionCerca", img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "cefalea", nombre: "Cefalea", for: "cefalea", img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "hiperemia", nombre: "Hiperemia", for: "hiperemia", img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "visionDoble", nombre: "Vision doble", for: "visionDoble", img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "vertigo", nombre: "Vertigo", for: "vertigo", img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "lagrimeo", nombre: "Lagrimeo", for: "lagrimeo", img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "mareo", nombre: "Mareo", for: "mareo", img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "observacionesSintomasOpto", nombre: "Otro", for: "observacionesSintomasOpto", img:"../../../../assets/logos/003.jpg"},
          { id: "Secrecion", nombre: "Secreción", for: "Secrecion",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "resequedadOcular", nombre: "Resequedad ocular", for: "resequedadOcular", img:"../../../../assets/logos/026.JPG", options: this.sino },

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
    localStorage.setItem("OptometriaSintomas", JSON.stringify(data));
  }
}
