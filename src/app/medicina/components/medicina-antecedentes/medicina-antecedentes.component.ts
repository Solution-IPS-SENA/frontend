import { Component, OnInit } from '@angular/core';
import { InputDatosDoble, InputDatos } from 'src/app/shared/interfaces/input-datos';

@Component({
  selector: 'app-medicina-antecedentes',
  templateUrl: './medicina-antecedentes.component.html',
  styleUrls: ['./medicina-antecedentes.component.css']
})
export class MedicinaAntecedentesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  inputsPersonales: InputDatos[] = [
    { id: "patologicos", nombre: "Patológicos", for: "patologicos", options: [
      {
        valor: "patologicos",
        nombre: "patologicos1",
      },
      {
        valor: "perra",
        nombre: "Juank",
      },
      {
        valor: "imbecil",
        nombre: "Juanjo",
      },
      {
        valor: "loca",
        nombre: "Julian",
      },
      {
        valor: "jejeje",
        nombre: "Jorge",
      },
    ] },
    { id: "quirurgicos", nombre: "Quirúrgicos", for: "quirurgicos" , options: [
      {
        valor: "quirurgicos",
        nombre: "quirurgicos1",
      },
      {
        valor: "perra",
        nombre: "Juank",
      },
      {
        valor: "imbecil",
        nombre: "Juanjo",
      },
      {
        valor: "loca",
        nombre: "Julian",
      },
      {
        valor: "jejeje",
        nombre: "Jorge",
      },
    ] },
    { id: "traumaticos", nombre: "Traumáticos", for: "traumaticos" , options: [
      {
        valor: "traumaticos",
        nombre: "traumaticos1",
      },
      {
        valor: "perra",
        nombre: "Juank",
      },
      {
        valor: "imbecil",
        nombre: "Juanjo",
      },
      {
        valor: "loca",
        nombre: "Julian",
      },
      {
        valor: "jejeje",
        nombre: "Jorge",
      },
    ] },
    { id: "toxicos", nombre: "Tóxicos", for: "toxicos" , options: [
      {
        valor: "toxicos",
        nombre: "toxicos1",
      },
      {
        valor: "perra",
        nombre: "Juank",
      },
      {
        valor: "imbecil",
        nombre: "Juanjo",
      },
      {
        valor: "loca",
        nombre: "Julian",
      },
      {
        valor: "jejeje",
        nombre: "Jorge",
      },
    ] },
    { id: "alergicos", nombre: "Alérgicos", for: "alergicos" , options: [
      {
        valor: "alergicos",
        nombre: "alergicos1",
      },
      {
        valor: "perra",
        nombre: "Juank",
      },
      {
        valor: "imbecil",
        nombre: "Juanjo",
      },
      {
        valor: "loca",
        nombre: "Julian",
      },
      {
        valor: "jejeje",
        nombre: "Jorge",
      },
    ] },
    { id: "farmacologicos", nombre: "Farmacológicos", for: "farmacologicos" , options: [
      {
        valor: "farmacologicos",
        nombre: "farmacologicos1",
      },
      {
        valor: "perra",
        nombre: "Juank",
      },
      {
        valor: "imbecil",
        nombre: "Juanjo",
      },
      {
        valor: "loca",
        nombre: "Julian",
      },
      {
        valor: "jejeje",
        nombre: "Jorge",
      },
    ] },
    { id: "transfusionales", nombre: "Transfusionales", for: "transfusionales" , options: [
      {
        valor: "transfusionales",
        nombre: "transfusionales",
      },
      {
        valor: "perra",
        nombre: "Juank",
      },
      {
        valor: "imbecil",
        nombre: "Juanjo",
      },
      {
        valor: "loca",
        nombre: "Julian",
      },
      {
        valor: "jejeje",
        nombre: "Jorge",
      },
    ] },
    { id: "ets", nombre: "E.T.S", for: "ets" , options: [
      {
        valor: "ets",
        nombre: "ets1",
      },
      {
        valor: "perra",
        nombre: "Juank",
      },
      {
        valor: "imbecil",
        nombre: "Juanjo",
      },
      {
        valor: "loca",
        nombre: "Julian",
      },
      {
        valor: "jejeje",
        nombre: "Jorge",
      },
    ] },
  ]

  inputsFamiliares: InputDatosDoble[] = [
    { id: "padre", nombre: "Padre", options: [
      {
        valor: "enfermedadCardiovascular",
        nombre: "Enfermedades cardiovasculares",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ], 
    options2: [
      {
        valor: "enfermedadCongenita",
        nombre: "Enfermedades congenitas",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ]},
    { id: "madre", nombre: "Madre", options: [
      {
        valor: "enfermedadCardiovascular",
        nombre: "Enfermedades cardiovasculares",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ], 
    options2: [
      {
        valor: "enfermedadCongenita",
        nombre: "Enfermedades congenitas",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ]},
 ]
}
