import { Component, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';

@Component({
  selector: 'app-medicina-factor-riesgo',
  templateUrl: './medicina-factor-riesgo.component.html',
  styleUrls: ['./medicina-factor-riesgo.component.css']
})
export class MedicinaFactorRiesgoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  inputs: InputDatos[] = [
    { id: "fisicoFactorRiesgo1", nombre: "Dermatológico", for: "fisicoFactorRiesgo1", options: [
      {
        valor: "si",
        nombre: "Si",
      }
    ] },
    { id: "biologicoFactorRiesgo1", nombre: "Osteomuscular", for: "biologicoFactorRiesgo1", options: [
      {
        valor: "si",
        nombre: "Si",
      }
    ] },
    { id: "quimicoFactorRiesgo1", nombre: "Osteoarticular", for: "quimicoFactorRiesgo1", options: [
      {
        valor: "si",
        nombre: "Si",
      }
    ] },
    { id: "seguridadFactorRiesgo1", nombre: "Genitourinario", for: "seguridadFactorRiesgo1", options: [
      {
        valor: "si",
        nombre: "Si",
      }
    ] },
    { id: "biomecanicoFactorRiesgo1", nombre: "Metabólico", for: "biomecanicoFactorRiesgo1", options: [
      {
        valor: "si",
        nombre: "Si",
      }
    ] },
    { id: "psicosocialFactorRiesgo1", nombre: "Neurológico", for: "psicosocialFactorRiesgo1", options: [
      {
        valor: "si",
        nombre: "Si",
      }
    ] },
    { id: "fisicoFactorRiesgo2", nombre: "Dermatológico", for: "fisicoFactorRiesgo2", options: [
      {
        valor: "si",
        nombre: "Si",
      }
    ] },
    { id: "biologicoFactorRiesgo2", nombre: "Osteomuscular", for: "biologicoFactorRiesgo2", options: [
      {
        valor: "si",
        nombre: "Si",
      }
    ] },
    { id: "quimicoFactorRiesgo2", nombre: "Osteoarticular", for: "quimicoFactorRiesgo2", options: [
      {
        valor: "si",
        nombre: "Si",
      }
    ] },
    { id: "seguridadFactorRiesgo2", nombre: "Genitourinario", for: "seguridadFactorRiesgo2", options: [
      {
        valor: "si",
        nombre: "Si",
      }
    ] },
    { id: "biomecanicoFactorRiesgo2", nombre: "Metabólico", for: "biomecanicoFactorRiesgo2", options: [
      {
        valor: "si",
        nombre: "Si",
      }
    ] },
    { id: "psicosocialFactorRiesgo2", nombre: "Neurológico", for: "psicosocialFactorRiesgo2", options: [
      {
        valor: "si",
        nombre: "Si",
      }
    ] },
    { id: "fisicoFactorRiesgo3", nombre: "Dermatológico", for: "fisicoFactorRiesgo3", options: [
      {
        valor: "si",
        nombre: "Si",
      }
    ] },
    { id: "biologicoFactorRiesgo3", nombre: "Osteomuscular", for: "biologicoFactorRiesgo3", options: [
      {
        valor: "si",
        nombre: "Si",
      }
    ] },
    { id: "quimicoFactorRiesgo3", nombre: "Osteoarticular", for: "quimicoFactorRiesgo3", options: [
      {
        valor: "si",
        nombre: "Si",
      }
    ] },
    { id: "seguridadFactorRiesgo3", nombre: "Genitourinario", for: "seguridadFactorRiesgo3", options: [
      {
        valor: "si",
        nombre: "Si",
      }
    ] },
    { id: "biomecanicoFactorRiesgo3", nombre: "Metabólico", for: "biomecanicoFactorRiesgo3", options: [
      {
        valor: "si",
        nombre: "Si",
      }
    ] },
    { id: "psicosocialFactorRiesgo3", nombre: "Neurológico", for: "psicosocialFactorRiesgo3", options: [
      {
        valor: "si",
        nombre: "Si",
      }
    ] },
    { id: "fisicoFactorRiesgo4", nombre: "Dermatológico", for: "fisicoFactorRiesgo4", options: [
      {
        valor: "si",
        nombre: "Si",
      }
    ] },
    { id: "biologicoFactorRiesgo4", nombre: "Osteomuscular", for: "biologicoFactorRiesgo4", options: [
      {
        valor: "si",
        nombre: "Si",
      }
    ] },
    { id: "quimicoFactorRiesgo4", nombre: "Osteoarticular", for: "quimicoFactorRiesgo4", options: [
      {
        valor: "si",
        nombre: "Si",
      }
    ] },
    { id: "seguridadFactorRiesgo4", nombre: "Genitourinario", for: "seguridadFactorRiesgo4", options: [
      {
        valor: "si",
        nombre: "Si",
      }
    ] },
    { id: "biomecanicoFactorRiesgo4", nombre: "Metabólico", for: "biomecanicoFactorRiesgo4", options: [
      {
        valor: "si",
        nombre: "Si",
      }
    ] },
    { id: "psicosocialFactorRiesgo4", nombre: "Neurológico", for: "psicosocialFactorRiesgo4", options: [
      {
        valor: "si",
        nombre: "Si",
      }
    ] },
  ]
}
