import { Component, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';

@Component({
  selector: 'app-optometria-antecedentes-ocupacionales',
  templateUrl: './optometria-antecedentes-ocupacionales.component.html',
  styleUrls: ['./optometria-antecedentes-ocupacionales.component.css']
})
export class OptometriaAntecedentesOcupacionalesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  inputs: InputDatos[] = [
    { id: "exposicionVideoTerminales", nombre: "Exposicion a video - terminales", for: "exposicionVideoTerminales", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "accidenteOcular", nombre: "Accidente Ocular", for: "accidenteOcular", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "temperaturasExtremas", nombre: "Temperaturas extremas", for: "temperaturasExtremas", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "materialParticulado", nombre: "Material particulado", for: "materialParticulado", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "radiacionNoIonizante", nombre: "Radiacion no Ionizante", for: "radiacionNoIonizante", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "radiacionIonizante", nombre: "Radiacion Ionizante", for: "radiacionIonizante", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "exposicionQuimicos", nombre: "Exposicion a quimicos", for: "exposicionQuimicos", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "exposicionSolventes", nombre: "Exposicion a solventes", for: "exposicionSolventes", options: [
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
