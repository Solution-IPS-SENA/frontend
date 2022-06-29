import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay, filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { ObtenerAnexosService } from 'src/app/shared/services/obtener-anexos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inAnexoValidator } from 'src/app/shared/validators/in-anexo.validator';

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
    { id: "ant_def_refra", nombre: "Defectos refractivos", for: "ant_def_refra", img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "ant_def_cx", nombre: "CX Ocular", for: "ant_def_cx", img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "ant_estra", nombre: "Estrabismos", for: "ant_estra", img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "ant_pato", nombre: "Patologias oculares", for: "ant_pato",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "ant_tto", nombre: "TTO ortoptico", for: "ant_tto",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "ant_hiper", nombre: "Hipertension arterial", for: "ant_hiper",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "ant_diab", nombre: "Diabetes mellitus", for: "ant_diab",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "ant_desor", nombre: "Desordenes tiroides", for: "ant_desor",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "observacionesAntecedentesPersonalesOpto", nombre: "Observaciones", for: "observacionesAntecedentesPersonalesOpto",img:"../../../../assets/logos/003.jpg" },
    { id: "ant_acc", nombre: "Accidente cerebro vascular", for: "ant_acc",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "ant_trau", nombre: "Trauma craneo encefalico", for: "ant_trau",img:"../../../../assets/logos/026.JPG", options: this.sino },
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
        ant_def_refra: [data ? data.ant_def_refra : this.sino[0]["valor"], [Validators.required, inAnexoValidator(this.sino)]],
        ant_def_cx: [data ? data.ant_def_cx : this.sino[0]["valor"], [Validators.required, inAnexoValidator(this.sino)]],
        ant_estra: [data ? data.ant_estra : this.sino[0]["valor"] ,[Validators.required, inAnexoValidator(this.sino)]],
        ant_pato: [data ? data.ant_pato : this.sino[0]["valor"] ,[Validators.required, inAnexoValidator(this.sino)]],
        ant_tto: [data ? data.ant_tto : this.sino[0]["valor"] ,[Validators.required, inAnexoValidator(this.sino)]],
        ant_hiper: [data ? data.ant_hiper : this.sino[0]["valor"], [Validators.required, inAnexoValidator(this.sino)]],
        ant_diab: [data ? data.ant_diab :this.sino[0]["valor"], [Validators.required, inAnexoValidator(this.sino)]],
        ant_desor: [data ? data.ant_desor : this.sino[0]["valor"] ,[Validators.required, inAnexoValidator(this.sino)]],
        ant_obs: [data ? data.ant_obs : '' ],
        ant_acc: [data ? data.ant_acc : this.sino[0]["valor"], [Validators.required, inAnexoValidator(this.sino)]],
        ant_trau: [data ? data.ant_trau : this.sino[0]["valor"], [Validators.required, inAnexoValidator(this.sino)]],
      });
    }

  ngOnInit(): void {
    let dataRecovery = localStorage.getItem("optometriaAntecedentesPersonales");
    dataRecovery = dataRecovery ? JSON.parse(dataRecovery) : dataRecovery;

    this.currentPage = this.getCurrentPageUrl();
    this.obtenerAnexosService.getAnexos(["sino"]).subscribe(
      (response: InformacionAnexos) => {
        this.sino = this.obtenerAnexosService.formatear_datos(response.sino)

        this.inputs$ = of([
          { id: "ant_def_refra", nombre: "Defectos refractivos", for: "ant_def_refra", img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "ant_def_cx", nombre: "CX Ocular", for: "ant_def_cx", img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "ant_estra", nombre: "Estrabismos", for: "ant_estra", img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "ant_pato", nombre: "Patologias oculares", for: "ant_pato",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "ant_tto", nombre: "TTO ortoptico", for: "ant_tto",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "ant_hiper", nombre: "Hipertension arterial", for: "ant_hiper",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "ant_diab", nombre: "Diabetes mellitus", for: "ant_diab",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "ant_desor", nombre: "Desordenes tiroides", for: "ant_desor",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "observacionesAntecedentesPersonalesOpto", nombre: "Observaciones", for: "observacionesAntecedentesPersonalesOpto",img:"../../../../assets/logos/003.jpg" },
          { id: "ant_acc", nombre: "Accidente cerebro vascular", for: "ant_acc",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "ant_trau", nombre: "Trauma craneo encefalico", for: "ant_trau",img:"../../../../assets/logos/026.JPG", options: this.sino },
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
    localStorage.setItem("optometriaAntecedentesPersonales", JSON.stringify(data));
  }
}
