import { Component } from "@angular/core";

@Component({
    selector: 'recepcion',
    templateUrl: './recepcion.html',
})
export class RecepcionComponent {

  titulo: string;

  constructor() {
    this.titulo = 'Módulo Clinico';
  }

  opcionesAdminPaciente: any = [ //Este es para pacientes
      {ruta:"../../../../assets/logos/022.JPG", nombre:"Citas"},
      {ruta:"../../../../assets/logos/024.JPG", nombre:"Pagos"},
      {ruta:"../../../../assets/logos/025.JPG", nombre:"Remisiones"},
      {ruta:"../../../../assets/logos/021.JPG", nombre:"Certificaciones"},
  ]

  opcionesClinico: any = [ //Este es para doctores
      {ruta:"../../../../assets/logos/016.jpg", nombre:"Medicina", url: '/historias/medicina'},
      {ruta:"../../../../assets/logos/010.jpg", nombre:"Laboratorio", url: '/historias/laboratorio'},
      {ruta:"../../../../assets/logos/003.jpg", nombre:"Psicologia", url: '/historias/psicologia'},
      {ruta:"../../../../assets/logos/026.JPG", nombre:"Optometria", url: '/historias/optometria'},
      {ruta:"../../../../assets/logos/021.JPG", nombre:"Certificaciones", url: '/historias/certificaciones'},
  ]

  opcionesContable: any = [ //Este es para el contador
      {ruta:"../../../../assets/logos/024.JPG", nombre:"Facturacion"},
      {ruta:"../../../../assets/logos/007.jpg", nombre:"Consultas"},
      {ruta:"../../../../assets/logos/023.JPG", nombre:"Anulacion"},
      {ruta:"../../../../assets/logos/028.JPG", nombre:"Recibos"},
  ]

  opcionesRecepcion: any = [ //Este es para secretarios
      {ruta:"../../../../assets/logos/007.jpg", nombre:"Consultas"},
      {ruta:"../../../../assets/logos/022.JPG", nombre:"Citas"},
      {ruta:"../../../../assets/logos/024.JPG", nombre:"Facturacion"},
      {ruta:"../../../../assets/logos/019.JPG", nombre:"Registro Paciente"},
      {ruta:"../../../../assets/logos/021.JPG", nombre:"Certificaciones"},
      {ruta:"../../../../assets/logos/023.JPG", nombre:"Cancelaciones"},
      {ruta:"../../../../assets/logos/025.JPG", nombre:"Remisiones"},
      {ruta:"../../../../assets/logos/019.JPG", nombre:"Registro Personal"},
  ]
}
