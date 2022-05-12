import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu-modulo-admin-paciente',
  templateUrl: './menu-modulo-admin-paciente.component.html',
  styleUrls: ['./menu-modulo-admin-paciente.component.css']
})
export class MenuModuloAdminPacienteComponent implements OnInit {

  @Input() opciones: any={}
  constructor() { }

  ngOnInit(): void {
  }

}
