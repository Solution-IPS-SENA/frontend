import { Component, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';
import { delay, Observable, of } from 'rxjs';
import { InformacionAnexos } from 'src/app/shared/interfaces/informacion-anexos';
import { ObtenerAnexosService } from '../../../shared/services/obtener-anexos.service';

@Component({
  selector: 'app-medicina-factor-riesgo',
  templateUrl: './medicina-factor-riesgo.component.html',
  styleUrls: ['./medicina-factor-riesgo.component.css']
})
export class MedicinaFactorRiesgoComponent implements OnInit {

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
    { id: "fisicoFactorRiesgoFactores1", nombre: "Dermatológico", for: "fisicoFactorRiesgoFactores1", options: this.fisico},
    { id: "biologicoFactorRiesgoFactores1", nombre: "Osteomuscular", for: "biologicoFactorRiesgoFactores1", options: this.biologico},
    { id: "quimicoFactorRiesgoFactores1", nombre: "Osteoarticular", for: "quimicoFactorRiesgoFactores1", options: this.quimico},
    { id: "seguridadFactorRiesgoFactores1", nombre: "Genitourinario", for: "seguridadFactorRiesgoFactores1", options: this.seguridad},
    { id: "biomecanicoFactorRiesgoFactores1", nombre: "Metabólico", for: "biomecanicoFactorRiesgoFactores1", options: this.biomecanico},
    { id: "psicosocialFactorRiesgoFactores1", nombre: "Neurológico", for: "psicosocialFactorRiesgoFactores1", options: this.psicosocial},
    { id: "fisicoFactorRiesgoFactores2", nombre: "Dermatológico", for: "fisicoFactorRiesgoFactores2", options: this.fisico},
    { id: "biologicoFactorRiesgoFactores2", nombre: "Osteomuscular", for: "biologicoFactorRiesgoFactores2", options: this.biologico},
    { id: "quimicoFactorRiesgoFactores2", nombre: "Osteoarticular", for: "quimicoFactorRiesgoFactores2", options: this.quimico},
    { id: "seguridadFactorRiesgoFactores2", nombre: "Genitourinario", for: "seguridadFactorRiesgoFactores2", options: this.seguridad},
    { id: "biomecanicoFactorRiesgoFactores2", nombre: "Metabólico", for: "biomecanicoFactorRiesgoFactores2", options: this.biomecanico},
    { id: "psicosocialFactorRiesgoFactores2", nombre: "Neurológico", for: "psicosocialFactorRiesgoFactores2", options: this.psicosocial},
    { id: "fisicoFactorRiesgoFactores3", nombre: "Dermatológico", for: "fisicoFactorRiesgoFactores3", options: this.fisico},
    { id: "biologicoFactorRiesgoFactores3", nombre: "Osteomuscular", for: "biologicoFactorRiesgoFactores3", options: this.biologico},
    { id: "quimicoFactorRiesgoFactores3", nombre: "Osteoarticular", for: "quimicoFactorRiesgoFactores3", options: this.quimico},
    { id: "seguridadFactorRiesgoFactores3", nombre: "Genitourinario", for: "seguridadFactorRiesgoFactores3", options: this.seguridad},
    { id: "biomecanicoFactorRiesgoFactores3", nombre: "Metabólico", for: "biomecanicoFactorRiesgoFactores3", options: this.biomecanico},
    { id: "psicosocialFactorRiesgoFactores3", nombre: "Neurológico", for: "psicosocialFactorRiesgoFactores3", options: this.psicosocial},
    { id: "fisicoFactorRiesgoFactores4", nombre: "Dermatológico", for: "fisicoFactorRiesgoFactores4", options: this.fisico},
    { id: "biologicoFactorRiesgoFactores4", nombre: "Osteomuscular", for: "biologicoFactorRiesgoFactores4", options: this.biologico},
    { id: "quimicoFactorRiesgoFactores4", nombre: "Osteoarticular", for: "quimicoFactorRiesgoFactores4", options: this.quimico},
    { id: "seguridadFactorRiesgoFactores4", nombre: "Genitourinario", for: "seguridadFactorRiesgoFactores4", options: this.seguridad},
    { id: "biomecanicoFactorRiesgoFactores4", nombre: "Metabólico", for: "biomecanicoFactorRiesgoFactores4", options: this.biomecanico},
    { id: "psicosocialFactorRiesgoFactores4", nombre: "Neurológico", for: "psicosocialFactorRiesgoFactores4", options: this.psicosocial},
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
          { id: "fisicoFactorRiesgoFactores1", nombre: "Dermatológico", for: "fisicoFactorRiesgoFactores1", options: this.fisico},
          { id: "biologicoFactorRiesgoFactores1", nombre: "Osteomuscular", for: "biologicoFactorRiesgoFactores1", options: this.biologico},
          { id: "quimicoFactorRiesgoFactores1", nombre: "Osteoarticular", for: "quimicoFactorRiesgoFactores1", options: this.quimico},
          { id: "seguridadFactorRiesgoFactores1", nombre: "Genitourinario", for: "seguridadFactorRiesgoFactores1", options: this.seguridad},
          { id: "biomecanicoFactorRiesgoFactores1", nombre: "Metabólico", for: "biomecanicoFactorRiesgoFactores1", options: this.biomecanico},
          { id: "psicosocialFactorRiesgoFactores1", nombre: "Neurológico", for: "psicosocialFactorRiesgoFactores1", options: this.psicosocial},
          { id: "fisicoFactorRiesgoFactores2", nombre: "Dermatológico", for: "fisicoFactorRiesgoFactores2", options: this.fisico},
          { id: "biologicoFactorRiesgoFactores2", nombre: "Osteomuscular", for: "biologicoFactorRiesgoFactores2", options: this.biologico},
          { id: "quimicoFactorRiesgoFactores2", nombre: "Osteoarticular", for: "quimicoFactorRiesgoFactores2", options: this.quimico},
          { id: "seguridadFactorRiesgoFactores2", nombre: "Genitourinario", for: "seguridadFactorRiesgoFactores2", options: this.seguridad},
          { id: "biomecanicoFactorRiesgoFactores2", nombre: "Metabólico", for: "biomecanicoFactorRiesgoFactores2", options: this.biomecanico},
          { id: "psicosocialFactorRiesgoFactores2", nombre: "Neurológico", for: "psicosocialFactorRiesgoFactores2", options: this.psicosocial},
          { id: "fisicoFactorRiesgoFactores3", nombre: "Dermatológico", for: "fisicoFactorRiesgoFactores3", options: this.fisico},
          { id: "biologicoFactorRiesgoFactores3", nombre: "Osteomuscular", for: "biologicoFactorRiesgoFactores3", options: this.biologico},
          { id: "quimicoFactorRiesgoFactores3", nombre: "Osteoarticular", for: "quimicoFactorRiesgoFactores3", options: this.quimico},
          { id: "seguridadFactorRiesgoFactores3", nombre: "Genitourinario", for: "seguridadFactorRiesgoFactores3", options: this.seguridad},
          { id: "biomecanicoFactorRiesgoFactores3", nombre: "Metabólico", for: "biomecanicoFactorRiesgoFactores3", options: this.biomecanico},
          { id: "psicosocialFactorRiesgoFactores3", nombre: "Neurológico", for: "psicosocialFactorRiesgoFactores3", options: this.psicosocial},
          { id: "fisicoFactorRiesgoFactores4", nombre: "Dermatológico", for: "fisicoFactorRiesgoFactores4", options: this.fisico},
          { id: "biologicoFactorRiesgoFactores4", nombre: "Osteomuscular", for: "biologicoFactorRiesgoFactores4", options: this.biologico},
          { id: "quimicoFactorRiesgoFactores4", nombre: "Osteoarticular", for: "quimicoFactorRiesgoFactores4", options: this.quimico},
          { id: "seguridadFactorRiesgoFactores4", nombre: "Genitourinario", for: "seguridadFactorRiesgoFactores4", options: this.seguridad},
          { id: "biomecanicoFactorRiesgoFactores4", nombre: "Metabólico", for: "biomecanicoFactorRiesgoFactores4", options: this.biomecanico},
          { id: "psicosocialFactorRiesgoFactores4", nombre: "Neurológico", for: "psicosocialFactorRiesgoFactores4", options: this.psicosocial},
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
