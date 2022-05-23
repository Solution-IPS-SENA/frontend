import { Component, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { delay, Observable, of } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';

@Component({
  selector: 'app-medicina-antecedentes-ocupacionales',
  templateUrl: './medicina-antecedentes-ocupacionales.component.html',
  styleUrls: ['./medicina-antecedentes-ocupacionales.component.css']
})
export class MedicinaAntecedentesOcupacionalesComponent implements OnInit {

  fisico = [];
  biologico = [];
  quimico = [];
  seguridad = [];
  biomecanico = [];
  psicosocial = [];

  loaded$ = of(false);

  inputsTitulos$?: Observable<InputDatos[]> = of([
    { id: "tituloFisico", nombre: "Físico", for: "tituloFisico"},
    { id: "tituloBiologico", nombre: "Biológico", for: "tituloBiologico"},
    { id: "tituloQuimico", nombre: "Químico", for: "tituloQuimico"},
    { id: "tituloSeguridad", nombre: "Seguridad", for: "tituloSeguridad"},
    { id: "tituloBiomecanico", nombre: "Biomecánico", for: "tituloBiomecanico"},
    { id: "tituloPsicosocial", nombre: "Psicosocial", for: "tituloPsicosocial"},
  ]);

  inputs$?: Observable<InputDatos[]> = of([
    { id: "fisicoFactorRiesgoOcupacional1", nombre: "Dermatológico", for: "fisicoFactorRiesgoOcupacional1", options: this.fisico},
    { id: "biologicoFactorRiesgoOcupacional1", nombre: "Osteomuscular", for: "biologicoFactorRiesgoOcupacional1", options: this.biologico},
    { id: "quimicoFactorRiesgoOcupacional1", nombre: "Osteoarticular", for: "quimicoFactorRiesgoOcupacional1", options: this.quimico},
    { id: "seguridadFactorRiesgoOcupacional1", nombre: "Genitourinario", for: "seguridadFactorRiesgoOcupacional1", options: this.seguridad},
    { id: "biomecanicoFactorRiesgoOcupacional1", nombre: "Metabólico", for: "biomecanicoFactorRiesgoOcupacional1", options: this.biomecanico},
    { id: "psicosocialFactorRiesgoOcupacional1", nombre: "Neurológico", for: "psicosocialFactorRiesgoOcupacional1", options: this.psicosocial},
    { id: "fisicoFactorRiesgoOcupacional2", nombre: "Dermatológico", for: "fisicoFactorRiesgoOcupacional2", options: this.fisico},
    { id: "biologicoFactorRiesgoOcupacional2", nombre: "Osteomuscular", for: "biologicoFactorRiesgoOcupacional2", options: this.biologico},
    { id: "quimicoFactorRiesgoOcupacional2", nombre: "Osteoarticular", for: "quimicoFactorRiesgoOcupacional2", options: this.quimico},
    { id: "seguridadFactorRiesgoOcupacional2", nombre: "Genitourinario", for: "seguridadFactorRiesgoOcupacional2", options: this.seguridad},
    { id: "biomecanicoFactorRiesgoOcupacional2", nombre: "Metabólico", for: "biomecanicoFactorRiesgoOcupacional2", options: this.biomecanico},
    { id: "psicosocialFactorRiesgoOcupacional2", nombre: "Neurológico", for: "psicosocialFactorRiesgoOcupacional2", options: this.psicosocial},
    { id: "fisicoFactorRiesgoOcupacional3", nombre: "Dermatológico", for: "fisicoFactorRiesgoOcupacional3", options: this.fisico},
    { id: "biologicoFactorRiesgoOcupacional3", nombre: "Osteomuscular", for: "biologicoFactorRiesgoOcupacional3", options: this.biologico},
    { id: "quimicoFactorRiesgoOcupacional3", nombre: "Osteoarticular", for: "quimicoFactorRiesgoOcupacional3", options: this.quimico},
    { id: "seguridadFactorRiesgoOcupacional3", nombre: "Genitourinario", for: "seguridadFactorRiesgoOcupacional3", options: this.seguridad},
    { id: "biomecanicoFactorRiesgoOcupacional3", nombre: "Metabólico", for: "biomecanicoFactorRiesgoOcupacional3", options: this.biomecanico},
    { id: "psicosocialFactorRiesgoOcupacional3", nombre: "Neurológico", for: "psicosocialFactorRiesgoOcupacional3", options: this.psicosocial},
    { id: "fisicoFactorRiesgoOcupacional4", nombre: "Dermatológico", for: "fisicoFactorRiesgoOcupacional4", options: this.fisico},
    { id: "biologicoFactorRiesgoOcupacional4", nombre: "Osteomuscular", for: "biologicoFactorRiesgoOcupacional4", options: this.biologico},
    { id: "quimicoFactorRiesgoOcupacional4", nombre: "Osteoarticular", for: "quimicoFactorRiesgoOcupacional4", options: this.quimico},
    { id: "seguridadFactorRiesgoOcupacional4", nombre: "Genitourinario", for: "seguridadFactorRiesgoOcupacional4", options: this.seguridad},
    { id: "biomecanicoFactorRiesgoOcupacional4", nombre: "Metabólico", for: "biomecanicoFactorRiesgoOcupacional4", options: this.biomecanico},
    { id: "psicosocialFactorRiesgoOcupacional4", nombre: "Neurológico", for: "psicosocialFactorRiesgoOcupacional4", options: this.psicosocial},
  ]);

  constructor(private obtenerAnexosService: ObtenerAnexosService){
    this.obtenerAnexosService.getAnexos(["fisico","biologico","quimico","seguridad","biomecanico","psicosocial"]).pipe(delay(1000)).subscribe(
      (response: InformacionAnexos) => {
        this.fisico = this.formatear_datos(response.fisico)
        this.biologico = this.formatear_datos(response.biologico)
        this.quimico = this.formatear_datos(response.quimico)
        this.seguridad = this.formatear_datos(response.seguridad)
        this.biomecanico = this.formatear_datos(response.biomecanico)
        this.psicosocial = this.formatear_datos(response.psicosocial)

        this.inputs$ = of([
          { id: "fisicoFactorRiesgoOcupacional1", nombre: "Dermatológico", for: "fisicoFactorRiesgoOcupacional1", options: this.fisico},
          { id: "biologicoFactorRiesgoOcupacional1", nombre: "Osteomuscular", for: "biologicoFactorRiesgoOcupacional1", options: this.biologico},
          { id: "quimicoFactorRiesgoOcupacional1", nombre: "Osteoarticular", for: "quimicoFactorRiesgoOcupacional1", options: this.quimico},
          { id: "seguridadFactorRiesgoOcupacional1", nombre: "Genitourinario", for: "seguridadFactorRiesgoOcupacional1", options: this.seguridad},
          { id: "biomecanicoFactorRiesgoOcupacional1", nombre: "Metabólico", for: "biomecanicoFactorRiesgoOcupacional1", options: this.biomecanico},
          { id: "psicosocialFactorRiesgoOcupacional1", nombre: "Neurológico", for: "psicosocialFactorRiesgoOcupacional1", options: this.psicosocial},
          { id: "fisicoFactorRiesgoOcupacional2", nombre: "Dermatológico", for: "fisicoFactorRiesgoOcupacional2", options: this.fisico},
          { id: "biologicoFactorRiesgoOcupacional2", nombre: "Osteomuscular", for: "biologicoFactorRiesgoOcupacional2", options: this.biologico},
          { id: "quimicoFactorRiesgoOcupacional2", nombre: "Osteoarticular", for: "quimicoFactorRiesgoOcupacional2", options: this.quimico},
          { id: "seguridadFactorRiesgoOcupacional2", nombre: "Genitourinario", for: "seguridadFactorRiesgoOcupacional2", options: this.seguridad},
          { id: "biomecanicoFactorRiesgoOcupacional2", nombre: "Metabólico", for: "biomecanicoFactorRiesgoOcupacional2", options: this.biomecanico},
          { id: "psicosocialFactorRiesgoOcupacional2", nombre: "Neurológico", for: "psicosocialFactorRiesgoOcupacional2", options: this.psicosocial},
          { id: "fisicoFactorRiesgoOcupacional3", nombre: "Dermatológico", for: "fisicoFactorRiesgoOcupacional3", options: this.fisico},
          { id: "biologicoFactorRiesgoOcupacional3", nombre: "Osteomuscular", for: "biologicoFactorRiesgoOcupacional3", options: this.biologico},
          { id: "quimicoFactorRiesgoOcupacional3", nombre: "Osteoarticular", for: "quimicoFactorRiesgoOcupacional3", options: this.quimico},
          { id: "seguridadFactorRiesgoOcupacional3", nombre: "Genitourinario", for: "seguridadFactorRiesgoOcupacional3", options: this.seguridad},
          { id: "biomecanicoFactorRiesgoOcupacional3", nombre: "Metabólico", for: "biomecanicoFactorRiesgoOcupacional3", options: this.biomecanico},
          { id: "psicosocialFactorRiesgoOcupacional3", nombre: "Neurológico", for: "psicosocialFactorRiesgoOcupacional3", options: this.psicosocial},
          { id: "fisicoFactorRiesgoOcupacional4", nombre: "Dermatológico", for: "fisicoFactorRiesgoOcupacional4", options: this.fisico},
          { id: "biologicoFactorRiesgoOcupacional4", nombre: "Osteomuscular", for: "biologicoFactorRiesgoOcupacional4", options: this.biologico},
          { id: "quimicoFactorRiesgoOcupacional4", nombre: "Osteoarticular", for: "quimicoFactorRiesgoOcupacional4", options: this.quimico},
          { id: "seguridadFactorRiesgoOcupacional4", nombre: "Genitourinario", for: "seguridadFactorRiesgoOcupacional4", options: this.seguridad},
          { id: "biomecanicoFactorRiesgoOcupacional4", nombre: "Metabólico", for: "biomecanicoFactorRiesgoOcupacional4", options: this.biomecanico},
          { id: "psicosocialFactorRiesgoOcupacional4", nombre: "Neurológico", for: "psicosocialFactorRiesgoOcupacional4", options: this.psicosocial},
        ])

        this.inputsTitulos$ = of([
          { id: "tituloFisico", nombre: "Físico", for: "tituloFisico"},
          { id: "tituloBiologico", nombre: "Biológico", for: "tituloBiologico"},
          { id: "tituloQuimico", nombre: "Químico", for: "tituloQuimico"},
          { id: "tituloSeguridad", nombre: "Seguridad", for: "tituloSeguridad"},
          { id: "tituloBiomecanico", nombre: "Biomecánico", for: "tituloBiomecanico"},
          { id: "tituloPsicosocial", nombre: "Psicosocial", for: "tituloPsicosocial"},
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
