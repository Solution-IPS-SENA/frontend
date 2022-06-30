import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { delay, filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inAnexoValidator } from 'src/app/shared/validators/in-anexo.validator';

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
    { id: "ant_ocu_exp_vide", nombre: "Exposición a video - terminales", for: "ant_ocu_exp_vide",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "ant_ocu_acc", nombre: "Accidente Ocular", for: "ant_ocu_acc",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "ant_ocu_temp", nombre: "Temperaturas extremas", for: "ant_ocu_temp",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "ant_ocu_mate", nombre: "Material particulado", for: "ant_ocu_mate",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "ant_ocu_ra_no_io", nombre: "Radiación no Ionizante", for: "ant_ocu_ra_no_io",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "ant_ocu_ra_io", nombre: "Radiación Ionizante", for: "ant_ocu_ra_io",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "ant_ocu_exp_quim", nombre: "Exposición a quimicos", for: "ant_ocu_exp_quim",img:"../../../../assets/logos/026.JPG", options: this.sino },
    { id: "ant_ocu_exp_solv", nombre: "Exposición a solventes", for: "ant_ocu_exp_solv",img:"../../../../assets/logos/026.JPG", options: this.sino },
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
        ant_ocu_exp_vide: [data ? data.ant_ocu_exp_vide : this.sino[0]["valor"], [Validators.required, inAnexoValidator(this.sino)]],
        ant_ocu_acc: [data ? data.ant_ocu_acc : this.sino[0]["valor"], [Validators.required, inAnexoValidator(this.sino)]],
        ant_ocu_temp: [data ? data.ant_ocu_temp : this.sino[0]["valor"] ,[Validators.required, inAnexoValidator(this.sino)]],
        ant_ocu_mate: [data ? data.ant_ocu_mate : this.sino[0]["valor"] ,[Validators.required, inAnexoValidator(this.sino)]],
        ant_ocu_ra_no_io: [data ? data.ant_ocu_ra_no_io :this.sino[0]["valor"], [Validators.required, inAnexoValidator(this.sino)]],
        ant_ocu_ra_io: [data ? data.ant_ocu_ra_io : this.sino[0]["valor"] ,[Validators.required, inAnexoValidator(this.sino)]],
        ant_ocu_exp_quim: [data ? data.ant_ocu_exp_quim :this.sino[0]["valor"], [Validators.required, inAnexoValidator(this.sino)]],
        ant_ocu_exp_solv: [data ? data.ant_ocu_exp_solv : this.sino[0]["valor"], [Validators.required, inAnexoValidator(this.sino)]],
        ant_ocu_obs: [data ? data.ant_ocu_obs :'']
      });
    }

  ngOnInit(): void {
    let dataRecovery = localStorage.getItem("optometriaAntecedentesOcupacionales");
    dataRecovery = dataRecovery ? JSON.parse(dataRecovery) : dataRecovery;

    this.currentPage = this.getCurrentPageUrl();
    this.obtenerAnexosService.getAnexos(["sino"]).subscribe(
      (response: InformacionAnexos) => {
        this.sino = this.obtenerAnexosService.formatear_datos(response.sino)

        this.inputs$ = of([
          { id: "ant_ocu_exp_vide", nombre: "Exposición a video - terminales", for: "ant_ocu_exp_vide",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "ant_ocu_acc", nombre: "Accidente Ocular", for: "ant_ocu_acc",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "ant_ocu_temp", nombre: "Temperaturas extremas", for: "ant_ocu_temp",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "ant_ocu_mate", nombre: "Material particulado", for: "ant_ocu_mate",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "ant_ocu_ra_no_io", nombre: "Radiación no Ionizante", for: "ant_ocu_ra_no_io",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "ant_ocu_ra_io", nombre: "Radiación Ionizante", for: "ant_ocu_ra_io",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "ant_ocu_exp_quim", nombre: "Exposición a quimicos", for: "ant_ocu_exp_quim",img:"../../../../assets/logos/026.JPG", options: this.sino },
          { id: "ant_ocu_exp_solv", nombre: "Exposición a solventes", for: "ant_ocu_exp_solv",img:"../../../../assets/logos/026.JPG", options: this.sino },
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
