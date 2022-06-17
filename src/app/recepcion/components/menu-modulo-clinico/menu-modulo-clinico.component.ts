import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-modulo-clinico',
  templateUrl: './menu-modulo-clinico.component.html',
  styleUrls: ['./menu-modulo-clinico.component.css']
})
export class MenuModuloClinicoComponent implements OnInit {

  @Input() opciones: any={}
  constructor() {

  }

  ngOnInit(): void {
  }

}
