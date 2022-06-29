import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { delay, filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { inAnexoValidator } from 'src/app/shared/validators/in-anexo.validator';

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

  inputsHallazgo1$?: Observable<InputDatos[]> = of([
    { id: "examenExterno", nombre: "Examen externo", for:"hal_ext_od", for2:"hal_ext_oi", img:"../../../../assets/logos/026.JPG", options: this.normalidad, options2: this.normalidad},
    { id: "motilidadOcular", nombre: "Motilidad ocular" ,for:"hal_mot_od", for2:"hal_mot_oi", img:"../../../../assets/logos/026.JPG", options: this.normalidad, options2: this.normalidad},
    { id: "oftalmoscopia", nombre: "Oftalmoscopia" ,for:"hal_ofta_od", for2:"hal_ofta_oi", img:"../../../../assets/logos/026.JPG", options: this.normalidad, options2: this.normalidad},
    { id: "campoVisualConfrontacion", nombre: "Campo visual por confrontacion" ,for:"hal_camp_od", for2:"hal_camp_oi", img:"../../../../assets/logos/026.JPG", options: this.normalidad, options2: this.normalidad},
  ]);

  inputsHallazgo2$?: Observable<InputDatos[]> = of([
    { id: "Estereopsis", nombre: "Estereopsis" , for:"hal_est_od", for2:"hal_est_oi", img:"../../../../assets/logos/026.JPG", options: this.normalidad, options2: this.normalidad},
    { id: "Percepcioncromatica", nombre: "Percepcion cromatica" , for:"hal_crom_od", for2:"hal_crom_oi", img:"../../../../assets/logos/026.JPG",options: this.normalidad, options2: this.normalidad},
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
        hal_ext_od: [data ? data.hal_ext_od : this.normalidad[0]["valor"], [Validators.required, inAnexoValidator(this.normalidad)]],
        hal_ext_oi: [data ? data.hal_ext_oi :this.normalidad[0]["valor"], [Validators.required, inAnexoValidator(this.normalidad)]],
        hal_mot_od: [data ? data.hal_mot_od : this.normalidad[0]["valor"] ,[Validators.required, inAnexoValidator(this.normalidad)]],
        hal_mot_oi: [data ? data.hal_mot_oi : this.normalidad[0]["valor"] ,[Validators.required, inAnexoValidator(this.normalidad)]],
        hal_ofta_od: [data ? data.hal_ofta_od :this.normalidad[0]["valor"], [Validators.required, inAnexoValidator(this.normalidad)]],
        hal_ofta_oi: [data ? data.hal_ofta_oi : this.normalidad[0]["valor"] ,[Validators.required, inAnexoValidator(this.normalidad)]],
        hal_camp_od: [data ? data.hal_camp_od :this.normalidad[0]["valor"], [Validators.required, inAnexoValidator(this.normalidad)]],
        hal_camp_oi: [data ? data.hal_camp_oi : this.normalidad[0]["valor"], [Validators.required, inAnexoValidator(this.normalidad)]],
        hal_est_od: [data ? data.hal_est_od: this.normalidad[0]["valor"], [Validators.required, inAnexoValidator(this.normalidad)]],
        hal_est_oi: [data ? data.hal_est_oi :this.normalidad[0]["valor"], [Validators.required, inAnexoValidator(this.normalidad)]],
        hal_crom_od: [data ? data.hal_crom_od : this.normalidad[0]["valor"] ,[Validators.required, inAnexoValidator(this.normalidad)]],
        hal_crom_oi: [data ? data.hal_crom_oi : this.normalidad[0]["valor"] ,[Validators.required, inAnexoValidator(this.normalidad)]],
        hal_obs: [data ? data.hal_obs :'']
      });
    }

  ngOnInit(): void {
    let dataRecovery = localStorage.getItem("optometriaHallazgos");
    dataRecovery = dataRecovery ? JSON.parse(dataRecovery) : dataRecovery;

    this.currentPage = this.getCurrentPageUrl();
    this.obtenerAnexosService.getAnexos(["normalidad"]).subscribe(
      (response: InformacionAnexos) => {
        this.normalidad = this.obtenerAnexosService.formatear_datos(response.normalidad)

        this.inputsHallazgo1$ = of([
          { id: "examenExterno", nombre: "Examen externo", for:"hal_ext_od", for2:"hal_ext_oi", img:"../../../../assets/logos/026.JPG", options: this.normalidad, options2: this.normalidad},
          { id: "motilidadOcular", nombre: "Motilidad ocular" ,for:"hal_mot_od", for2:"hal_mot_oi", img:"../../../../assets/logos/026.JPG", options: this.normalidad, options2: this.normalidad},
          { id: "oftalmoscopia", nombre: "Oftalmoscopia" ,for:"hal_ofta_od", for2:"hal_ofta_oi", img:"../../../../assets/logos/026.JPG", options: this.normalidad, options2: this.normalidad},
          { id: "campoVisualConfrontacion", nombre: "Campo visual por confrontacion" ,for:"hal_camp_od", for2:"hal_camp_oi", img:"../../../../assets/logos/026.JPG", options: this.normalidad, options2: this.normalidad},
        ])

        this.inputsHallazgo2$ = of([
          { id: "Estereopsis", nombre: "Estereopsis" , for:"hal_est_od", for2:"hal_est_oi", img:"../../../../assets/logos/026.JPG", options: this.normalidad, options2: this.normalidad},
          { id: "Percepcioncromatica", nombre: "Percepcion cromatica" , for:"hal_crom_od", for2:"hal_crom_oi", img:"../../../../assets/logos/026.JPG",options: this.normalidad, options2: this.normalidad},
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
