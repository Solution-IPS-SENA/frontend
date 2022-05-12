import { Component, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';

@Component({
  selector: 'app-medicina-inmunizaciones',
  templateUrl: './medicina-inmunizaciones.component.html',
  styleUrls: ['./medicina-inmunizaciones.component.css']
})
export class MedicinaInmunizacionesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  inputs: InputDatos[] = [
    { id: "hepatitisA", nombre: "Hepatitis A", for: "hepatitisA", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "hepatitisB", nombre: "HepatitisB", for: "hepatitisB", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "tripleViral", nombre: "Triple viral", for: "tripleViral", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "tétanos", nombre: "Tétanos", for: "tétanos", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "malaria", nombre: "Malaria", for: "malaria", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "fAmarilla", nombre: "F. Amarilla", for: "fAmarilla", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "fTifoidea", nombre: "F. Tifoidea", for: "fTifoidea", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "covid", nombre: "Covid", for: "covid", options: [
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
