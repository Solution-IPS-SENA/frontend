import { Component, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';

@Component({
  selector: 'app-medicina-revision-sistemas',
  templateUrl: './medicina-revision-sistemas.component.html',
  styleUrls: ['./medicina-revision-sistemas.component.css']
})
export class MedicinaRevisionSistemasComponent implements OnInit {

  constructor() { }
 
  ngOnInit(): void {
  }

  inputs: InputDatos[] = [
    { id: "dermatologico", nombre: "Dermatológico", for: "dermatologico", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "osteomuscular", nombre: "Osteomuscular", for: "osteomuscular", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "osteoarticular", nombre: "Osteoarticular", for: "osteoarticular", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "genitourinario", nombre: "Genitourinario", for: "genitourinario", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "metabolico", nombre: "Metabólico", for: "metabolico", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "neurologico", nombre: "Neurológico", for: "neurologico", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "cardiorespiratorio", nombre: "Cardiorespiratorio", for: "cardiorespiratorio", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "endocrinologico", nombre: "Endocrinológico", for: "endocrinologico", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "urologico", nombre: "Urológico", for: "urologico", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "gastrointestinal", nombre: "Gastrointestinal", for: "gastrointestinal", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "orl", nombre: "ORL", for: "orl", options: [
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
