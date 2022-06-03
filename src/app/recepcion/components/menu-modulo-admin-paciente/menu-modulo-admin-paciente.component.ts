import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu-modulo-admin-paciente',
  templateUrl: './menu-modulo-admin-paciente.component.html',
  styleUrls: ['./menu-modulo-admin-paciente.component.css']
})
export class MenuModuloAdminPacienteComponent implements OnInit {

  @Input() opciones: any={}

  opcionesAdminPaciente: any = [ //Este es para pacientes
      {ruta:"../../../../assets/logos/022.JPG", nombre:"Citas"},
      {ruta:"../../../../assets/logos/024.JPG", nombre:"Pagos"},
      {ruta:"../../../../assets/logos/025.JPG", nombre:"Remisiones"},
      {ruta:"../../../../assets/logos/021.JPG", nombre:"Certificaciones"},
  ]
  
  constructor() { }

  ngOnInit(): void {
  }

}
