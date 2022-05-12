import { Component, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';

@Component({
  selector: 'app-optometria-sintomas',
  templateUrl: './optometria-sintomas.component.html',
  styleUrls: ['./optometria-sintomas.component.css']
})
export class OptometriaSintomasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  inputs: InputDatos[] = [
    { id: "malaVisionLejos", nombre: "Mala vision de lejos", for: "malaVisionLejos", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "malaVisionCerca", nombre: "Mala vision de cerca", for: "malaVisionCerca", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "cefalea", nombre: "Cefalea", for: "cefalea", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "hiperemia", nombre: "Hiperemia", for: "hiperemia", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "visionDoble", nombre: "Vision doble", for: "visionDoble", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "vertigo", nombre: "Vertigo", for: "vertigo", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "lagrimeo", nombre: "Lagrimeo", for: "lagrimeo", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "mareo", nombre: "Mareo", for: "mareo", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },

    { id: "observacionesSintomasOpto", nombre: "Observaciones", for: "observacionesSintomasOpto"},
    { id: "Secrecion", nombre: "Secreción", for: "Secrecion", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "resequedadOcular", nombre: "Resequedad ocular", for: "resequedadOcular", options: [
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
