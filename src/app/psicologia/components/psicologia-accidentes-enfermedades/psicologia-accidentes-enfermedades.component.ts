import { Component, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';

@Component({
  selector: 'app-psicologia-accidentes-enfermedades',
  templateUrl: './psicologia-accidentes-enfermedades.component.html',
  styleUrls: ['./psicologia-accidentes-enfermedades.component.css']
})
export class PsicologiaAccidentesEnfermedadesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  inputs: InputDatos[] = [
    { id: "tratamientoPsicologico", nombre: "Ha estado en consulta o tratamiento psicologico o psiquiatrico:", for: "tratamientoPsicologico", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "enfermedadesPsicologicas", nombre: "Ha sufrido enfermedades psicologicas laborales o derivadas del estres laboral:", for: "enfermedadesPsicologicas", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "alteracionesSueño", nombre: "Presenta alteraciones del sueño:", for: "alteracionesSueño", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
  ]
}
