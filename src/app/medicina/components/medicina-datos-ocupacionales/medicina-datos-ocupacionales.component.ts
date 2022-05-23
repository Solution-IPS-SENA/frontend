import { Component, OnInit } from '@angular/core';
import { InputDatosType } from 'src/app/shared/interfaces/input-datos';
import { delay, Observable, of } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';

@Component({
  selector: 'app-medicina-datos-ocupacionales',
  templateUrl: './medicina-datos-ocupacionales.component.html',
  styleUrls: ['./medicina-datos-ocupacionales.component.css']
})
export class MedicinaDatosOcupacionalesComponent implements OnInit {

  equiposUtilizados = [];
  riesgosLaborales = [];
  institucion = [];

  loaded$ = of(false);

  inputsCondicionesActualesCargo$?: Observable<InputDatosType[]> = of([
    { id: "equiposUtilizados", nombre: "Equipos utilizados", type: "select", for: "equiposUtilizados", options: this.equiposUtilizados},
    { id: "actividadPrincipalRealizada", nombre: "Actividad principal realizada", type: "text", for: "actividadPrincipalRealizada" },
  ]);

  inputNumber$?: Observable<any> = of([
    { id: "1"},
    { id: "2"},
  ]);

  inputsAccidentesEnfermedadesLaborales1$?: Observable<InputDatosType[]> = of([
    { id: "empresa1", nombre: "Empresa", type: "text", for: "empresa1" },
    { id: "diagnostico1", nombre: "Diagnostico", type: "text", for: "diagnostico1" },
  ]);

  inputsAccidentesEnfermedadesLaborales2$?: Observable<InputDatosType[]> = of([
    { id: "empresa2", nombre: "Empresa", type: "text", for: "empresa2" },
    { id: "diagnostico2", nombre: "Diagnostico", type: "text", for: "diagnostico2" },
  ]);

  inputsEmpresa1$?: Observable<InputDatosType[]> = of([
    { id: "select1Emp1", nombre: "Empresa1", for:"select1Emp1", type:"select", options: this.riesgosLaborales},
    { id: "select2Emp1", nombre: "Empresa1", for:"select2Emp1", type:"date"},
    { id: "select3Emp1", nombre: "Empresa1", for:"select3Emp1", type:"select", options: this.institucion}
  ]);

  inputsEmpresa2$?: Observable<InputDatosType[]> = of([
    { id: "select1Emp2", nombre: "Empresa2", for:"select1Emp2", type:"select", options: this.riesgosLaborales},
    { id: "select2Emp2", nombre: "Empresa2", for:"select2Emp2", type:"date"},
    { id: "select3Emp2", nombre: "Empresa2", for:"select3Emp2", type:"select", options: this.institucion}
  ]);

  constructor(private obtenerAnexosService: ObtenerAnexosService){
    this.obtenerAnexosService.getAnexos(["equiposUtilizados","riesgosLaborales","institucion"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.equiposUtilizados = this.formatear_datos(response.equiposUtilizados)
        this.riesgosLaborales = this.formatear_datos(response.riesgosLaborales)
        this.institucion = this.formatear_datos(response.institucion)

        this.inputsCondicionesActualesCargo$ = of([
          { id: "equiposUtilizados", nombre: "Equipos utilizados", type: "select", for: "equiposUtilizados", options: this.equiposUtilizados},
          { id: "actividadPrincipalRealizada", nombre: "Actividad principal realizada", type: "text", for: "actividadPrincipalRealizada" },
        ]);
      
        this.inputNumber$ = of([
          { id: "1"},
          { id: "2"},
        ]);
      
        this.inputsAccidentesEnfermedadesLaborales1$ = of([
          { id: "empresa1", nombre: "Empresa", type: "text", for: "empresa1" },
          { id: "diagnostico1", nombre: "Diagnostico", type: "text", for: "diagnostico1" },
        ]);
      
        this.inputsAccidentesEnfermedadesLaborales2$ = of([
          { id: "empresa2", nombre: "Empresa", type: "text", for: "empresa2" },
          { id: "diagnostico2", nombre: "Diagnostico", type: "text", for: "diagnostico2" },
        ]);
      
        this.inputsEmpresa1$ = of([
          { id: "select1Emp1", nombre: "Empresa1", for:"select1Emp1", type:"select", options: this.riesgosLaborales},
          { id: "select2Emp1", nombre: "Empresa1", for:"select2Emp1", type:"date"},
          { id: "select3Emp1", nombre: "Empresa1", for:"select3Emp1", type:"select", options: this.institucion}
        ]);
      
        this.inputsEmpresa2$ = of([
          { id: "select1Emp2", nombre: "Empresa2", for:"select1Emp2", type:"select", options: this.riesgosLaborales},
          { id: "select2Emp2", nombre: "Empresa2", for:"select2Emp2", type:"date"},
          { id: "select3Emp2", nombre: "Empresa2", for:"select3Emp2", type:"select", options: this.institucion}
        ]);

        this.loaded$ = of(true);
      }
    )
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
  }
}
