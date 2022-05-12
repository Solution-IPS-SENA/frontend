import { Component, OnInit } from '@angular/core';
import { InputDatosDoble, InputDatosType } from 'src/app/shared/interfaces/input-datos';

@Component({
  selector: 'app-medicina-datos-ocupacionales',
  templateUrl: './medicina-datos-ocupacionales.component.html',
  styleUrls: ['./medicina-datos-ocupacionales.component.css']
})
export class MedicinaDatosOcupacionalesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  inputsCondicionesActualesCargo: InputDatosType[] = [
    { id: "equiposUtilizados", nombre: "Equipos utilizados", type: "text", for: "equiposUtilizados" },
    { id: "actividadPrincipalRealizada", nombre: "Actividad principal realizada", type: "text", for: "actividadPrincipalRealizada" },
  ]

  inputsAccidentesEnfermedadesLaborales: InputDatosType[] = [
    { id: "empresa1", nombre: "Empresa", type: "text", for: "empresa1" },
    { id: "diagnostico1", nombre: "Diagnostico", type: "text", for: "diagnostico1" },
    { id: "empresa2", nombre: "Empresa", type: "text", for: "empresa2" },
    { id: "diagnostico2", nombre: "Diagnostico", type: "text", for: "diagnostico2" },
  ]

  inputsEmpresa1: InputDatosDoble[]= [
    { id: "select1Emp1", nombre: "Empresa1", 
      options: [
        {
          valor: "si",
          nombre: "Si",
        },
        {
          valor: "no",
          nombre: "No",
        },
      ],
    },
    { id: "select2Emp1", nombre: "Empresa1", 
      options: [
        {
          valor: "si",
          nombre: "Si",
        },
        {
          valor: "no",
          nombre: "No",
        },
      ],
    },
    { id: "select3Emp1", nombre: "Empresa1", 
      options: [
        {
          valor: "si",
          nombre: "Si",
        },
        {
          valor: "no",
          nombre: "No",
        },
      ],
    }
  ]

  inputsEmpresa2: InputDatosDoble[]= [
    { id: "select1Emp2", nombre: "Empresa2", 
      options: [
        {
          valor: "si",
          nombre: "Si",
        },
        {
          valor: "no",
          nombre: "No",
        },
      ],
    },
    { id: "select2Emp2", nombre: "Empresa2", 
      options: [
        {
          valor: "si",
          nombre: "Si",
        },
        {
          valor: "no",
          nombre: "No",
        },
      ],
    },
    { id: "select3Emp2", nombre: "Empresa2", 
      options: [
        {
          valor: "si",
          nombre: "Si",
        },
        {
          valor: "no",
          nombre: "No",
        },
      ],
    }
  ]
}
