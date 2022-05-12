import { Component, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';

@Component({
  selector: 'app-optometria-antecedentes-personales',
  templateUrl: './optometria-antecedentes-personales.component.html',
  styleUrls: ['./optometria-antecedentes-personales.component.css']
})
export class OptometriaAntecedentesPersonalesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  inputs: InputDatos[] = [
    { id: "defectosRefractivos", nombre: "Defectos refractivos", for: "defectosRefractivos", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "cxOcular", nombre: "CX Ocular", for: "cxOcular", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "estrabismos", nombre: "Estrabismos", for: "estrabismos", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "patologiasOculares", nombre: "Patologias oculares", for: "patologiasOculares", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "ttoOrtoptico", nombre: "TTO ortoptico", for: "ttoOrtoptico", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "hipertensionArterial", nombre: "Hipertension arterial", for: "hipertensionArterial", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "diabetesMellitus", nombre: "Diabetes mellitus", for: "diabetesMellitus", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "desordenesTiroides", nombre: "Desordenes tiroides", for: "desordenesTiroides", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },

    { id: "observacionesAntecedentesPersonalesOpto", nombre: "Observaciones", for: "observacionesAntecedentesPersonalesOpto"},
    { id: "accidenteCerebroVascular", nombre: "Accidente cerebro vascular", for: "accidenteCerebroVascular", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "traumaCraneoEncefalico", nombre: "Trauma craneo encefalico", for: "traumaCraneoEncefalico", options: [
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
