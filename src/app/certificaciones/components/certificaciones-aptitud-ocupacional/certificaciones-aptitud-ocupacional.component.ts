import { Component, OnInit } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';

@Component({
  selector: 'app-certificaciones-aptitud-ocupacional',
  templateUrl: './certificaciones-aptitud-ocupacional.component.html',
  styleUrls: ['./certificaciones-aptitud-ocupacional.component.css']
})
export class CertificacionesAptitudOcupacionalComponent implements OnInit {

  loaded$ = of(false);

  inputs$?: Observable<InputDatos[]> = of([
    { id: "dni1", nombre: "DNI", type: "text"},
    { id: "nombre1", nombre: "Nombre", type: "text" },
    { id: "empresa1", nombre: "Empresa", type: "text"}
  ]);

  inputsCol1$?: Observable<InputDatos[]> = of([
    { id: "optometria", nombre: "Optometría", type: "text"},
    { id: "fonoaudiologia", nombre: "Fonoaudiología", type: "text" },
    { id: "psicologia", nombre: "Psicología", type: "text"},
    { id: "laboratorio", nombre: "Laboratorio", type: "text"},
    { id: "medicina", nombre: "Medicina", type: "text" }
  ]);

  inputsCol2$?: Observable<InputDatos[]> = of([
    { id: "aprobadoOptometria", nombre: "Aprobado", type: "text"},
    { id: "aprobadoFonoaudometria", nombre: "Aprobado", type: "text" },
    { id: "aprobadoPsicologia", nombre: "Aprobado", type: "text"},
    { id: "aprobadoLaboratorio", nombre: "Aprobado", type: "text"},
    { id: "aprobadoMedicina", nombre: "Aprobado", type: "text"}
  ]);

  inputsCol3$?: Observable<InputDatos[]> = of([
    { id: "protecciónOptometria", nombre: "Utiliza equipo de protección personal", type: "text"},
    { id: "protecciónFonoaudometria", nombre: "Utiliza equipo de protección personal", type: "text" },
    { id: "protecciónPsicologia", nombre: "Utiliza equipo de protección personal", type: "text"},
    { id: "protecciónLaboratorio", nombre: "Utiliza equipo de protección personal", type: "text"},
    { id: "protecciónMedicina", nombre: "Utiliza equipo de protección personal", type: "text"}
  ]);


  inputsCol4$?: Observable<InputDatos[]> = of([
    { id: "dniFirma", nombre: "DNI", type: "text"},
    { id: "nombreFirma", nombre: "Nombre", type: "text" }
  ]);

  inputsCol5$?: Observable<InputDatos[]> = of([
    { id: "registro", nombre: "Registro / TP", type: "text"},
    { id: "nombreFirma2", nombre: "Nombre", type: "text" }
  ]);

  constructor(private obtenerAnexosService: ObtenerAnexosService){
    this.obtenerAnexosService.getAnexos(["id"]).subscribe(
      (response: InformacionAnexos) => {

        this.inputs$ = of([
          { id: "dniCertificadoOcu", nombre: "dni", type: "text"},
          { id: "nombreCertificadoOcu", nombre: "nombre", type: "text" },
          { id: "empresaCertificadoOcu", nombre: "empresa", type: "text"}
  ])

        this.inputsCol1$ = of([
          { id: "optometria", nombre: "Optometría", type: "text"},
          { id: "fonoaudiologia", nombre: "Fonoaudiología", type: "text" },
          { id: "psicologia", nombre: "Psicología", type: "text"},
          { id: "laboratorio", nombre: "Laboratorio", type: "text"},
          { id: "medicina", nombre: "Medicina", type: "text" }
  ])

        this.inputsCol2$ = of([
          { id: "aprobadoOptometria", nombre: "Aprobado", type: "text"},
          { id: "aprobadoFonoaudometria", nombre: "Aprobado", type: "text" },
          { id: "aprobadoPsicologia", nombre: "Aprobado", type: "text"},
          { id: "aprobadoLaboratorio", nombre: "Aprobado", type: "text"},
          { id: "aprobadoMedicina", nombre: "Aprobado", type: "text"}
  ])

        this.inputsCol3$ = of([
          { id: "protecciónOptometria", nombre: "Utiliza equipo de protección personal", type: "text"},
          { id: "protecciónFonoaudometria", nombre: "Utiliza equipo de protección personal", type: "text" },
          { id: "protecciónPsicologia", nombre: "Utiliza equipo de protección personal", type: "text"},
          { id: "protecciónLaboratorio", nombre: "Utiliza equipo de protección personal", type: "text"},
          { id: "protecciónMedicina", nombre: "Utiliza equipo de protección personal", type: "text"}
  ])

        this.inputsCol4$ = of([
          { id: "dniFirma", nombre: "DNI", type: "text"},
          { id: "nombreFirma", nombre: "Nombre", type: "text" }
  ])


        this.inputsCol5$ = of([
          { id: "registro", nombre: "Registro / TP", type: "text"},
          { id: "nombreFirma2", nombre: "Nombre", type: "text" }
  ])

        this.loaded$ = of(true);
      }
    )
  }

  ngOnInit(): void {
  }
}
