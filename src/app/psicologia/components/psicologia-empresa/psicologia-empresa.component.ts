import { Component, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { delay, Observable, of } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';

@Component({
  selector: 'app-psicologia-empresa',
  templateUrl: './psicologia-empresa.component.html',
  styleUrls: ['./psicologia-empresa.component.css']
})
export class PsicologiaEmpresaComponent implements OnInit {

  sino = [];
  medioAmbiente = [];
  carga = [];

  loaded$ = of(false);

  inputs$?: Observable<InputDatos[]> = of([
    { id: "gestionOrganizacional", nombre: "Gestion organizacional", for: "gestionOrganizacional", options: this.sino},
    { id: "caracteristicasOrganizacion", nombre: "Caracteristicas de la organizacion", for: "caracteristicasOrganizacion",  options: this.sino },
    { id: "condicionTarea", nombre: "Condicion de la tarea", for: "condicionTarea",  options: this.sino },
    { id: "caracteristicasGrupoTrabajo", nombre: "Caracteristicas del grupo de trabajo", for: "caracteristicasGrupoTrabajo",  options: this.sino },
    { id: "interfacePersonaTarea", nombre: "Interface persona - Tarea", for: "interfacePersonaTarea",  options: this.sino },
    { id: "jornadaTrabajo", nombre: "Jornada de trabajo", for: "jornadaTrabajo",  options: this.sino },
    { id: "condicionMedioAmbienteTrabajo", nombre: "Condicion medio ambiente de trabajo", for: "condicionMedioAmbienteTrabajo", options: this.medioAmbiente},
    { id: "carga", nombre: "Carga", for: "carga", options: this.carga},
  ]);

  constructor(private obtenerAnexosService: ObtenerAnexosService){
    this.obtenerAnexosService.getAnexos(["sino", "medioAmbiente", "carga"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        console.log("Response:",response);
        if (!response) return; 
        this.sino = this.formatear_datos(response.sino)
        this.medioAmbiente = this.formatear_datos(response.medioAmbiente)
        this.carga = this.formatear_datos(response.carga)
        
        this.inputs$ = of([
          { id: "gestionOrganizacional", nombre: "Gestion organizacional", for: "gestionOrganizacional", options: this.sino},
          { id: "caracteristicasOrganizacion", nombre: "Caracteristicas de la organizacion", for: "caracteristicasOrganizacion",  options: this.sino },
          { id: "condicionTarea", nombre: "Condicion de la tarea", for: "condicionTarea",  options: this.sino },
          { id: "caracteristicasGrupoTrabajo", nombre: "Caracteristicas del grupo de trabajo", for: "caracteristicasGrupoTrabajo",  options: this.sino },
          { id: "interfacePersonaTarea", nombre: "Interface persona - Tarea", for: "interfacePersonaTarea",  options: this.sino },
          { id: "jornadaTrabajo", nombre: "Jornada de trabajo", for: "jornadaTrabajo",  options: this.sino },
          { id: "condicionMedioAmbienteTrabajo", nombre: "Condicion medio ambiente de trabajo", for: "condicionMedioAmbienteTrabajo", options: this.medioAmbiente},
          { id: "carga", nombre: "Carga", for: "carga", options: this.carga},
        ])
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
