import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { delay, filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inAnexoValidator } from 'src/app/shared/validators/in-anexo.validator';

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
    { id: "sis_mal_lej", nombre: "Mala vision de lejos", for: "sis_mal_lej", img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "sis_mal_cer", nombre: "Mala vision de cerca", for: "sis_mal_cer", img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "sis_cel", nombre: "Cefalea", for: "sis_cel", img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "sis_hiper", nombre: "Hiperemia", for: "sis_hiper", img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "sis_vis_dob", nombre: "Vision doble", for: "sis_vis_dob", img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "sis_vert", nombre: "Vertigo", for: "sis_vert", img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "sis_lagri", nombre: "Lagrimeo", for: "sis_lagri", img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "sis_mare", nombre: "Mareo", for: "sis_mare", img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "observacionesSintomasOpto", nombre: "Otro", for: "observacionesSintomasOpto", img:"../../../../assets/logos/003.jpg"},
    { id: "sis_secr", nombre: "Secreción", for: "sis_secr",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "sis_rese", nombre: "Resequedad ocular", for: "sis_rese", img:"../../../../assets/logos/026.JPG", options: this.sino },
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
        sis_mal_lej: [data ? data.sis_mal_lej : this.sino[0]["valor"], [Validators.required, inAnexoValidator(this.sino)]],
        sis_mal_cer: [data ? data.sis_mal_cer : this.sino[0]["valor"], [Validators.required, inAnexoValidator(this.sino)]],
        sis_cel: [data ? data.sis_cel : this.sino[0]["valor"] ,[Validators.required, inAnexoValidator(this.sino)]],
        sis_hiper: [data ? data.sis_hiper : this.sino[0]["valor"] ,[Validators.required, inAnexoValidator(this.sino)]],
        sis_vis_dob: [data ? data.sis_vis_dob : this.sino[0]["valor"] ,[Validators.required, inAnexoValidator(this.sino)]],
        sis_vert: [data ? data.sis_vert : this.sino[0]["valor"], [Validators.required, inAnexoValidator(this.sino)]],
        sis_lagri: [data ? data.sis_lagri :this.sino[0]["valor"], [Validators.required, inAnexoValidator(this.sino)]],
        sis_mare: [data ? data.sis_mare : this.sino[0]["valor"] ,[Validators.required, inAnexoValidator(this.sino)]],
        sis_otro: [data ? data.sis_otro : '' ],
        sis_secr: [data ? data.sis_secr : this.sino[0]["valor"], [Validators.required, inAnexoValidator(this.sino)]],
        sis_rese: [data ? data.sis_rese : this.sino[0]["valor"], [Validators.required, inAnexoValidator(this.sino)]]
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
    let dataRecovery = localStorage.getItem("optometriaSintomas");
    dataRecovery = dataRecovery ? JSON.parse(dataRecovery) : dataRecovery;

    this.currentPage = this.getCurrentPageUrl();
    this.obtenerAnexosService.getAnexos(["sino"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.sino = this.formatear_datos(response.sino)

        this.inputs$ = of([
          { id: "sis_mal_lej", nombre: "Mala vision de lejos", for: "sis_mal_lej", img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "sis_mal_cer", nombre: "Mala vision de cerca", for: "sis_mal_cer", img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "sis_cel", nombre: "Cefalea", for: "sis_cel", img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "sis_hiper", nombre: "Hiperemia", for: "sis_hiper", img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "sis_vis_dob", nombre: "Vision doble", for: "sis_vis_dob", img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "sis_vert", nombre: "Vertigo", for: "sis_vert", img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "sis_lagri", nombre: "Lagrimeo", for: "sis_lagri", img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "sis_mare", nombre: "Mareo", for: "sis_mare", img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "observacionesSintomasOpto", nombre: "Otro", for: "observacionesSintomasOpto", img:"../../../../assets/logos/003.jpg"},
          { id: "sis_secr", nombre: "Secreción", for: "sis_secr",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "sis_rese", nombre: "Resequedad ocular", for: "sis_rese", img:"../../../../assets/logos/026.JPG", options: this.sino },
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
    localStorage.setItem("optometriaSintomas", JSON.stringify(data));

  }
}
