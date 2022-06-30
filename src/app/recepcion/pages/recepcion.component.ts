import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/services/auth.service";

@Component({
    selector: 'recepcion',
    templateUrl: './recepcion.html',
})
export class RecepcionComponent {

  titulo: string;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    this.titulo = 'Menú';
  }

  opcionesPaciente: any = [ //Este es para pacientes
      {ruta:"../../../../assets/logos/022.JPG", nombre:"Citas"},
      {ruta:"../../../../assets/logos/024.JPG", nombre:"Pagos"},
      {ruta:"../../../../assets/logos/025.JPG", nombre:"Remisiones"},
      {ruta:"../../../../assets/logos/021.JPG", nombre:"Certificaciones", url: '/historias/certificaciones'},
  ]

  opcionesClinico: any = [ //Este es para doctores
      {ruta:"../../../../assets/logos/016.jpg", nombre:"Medicina", url: '/historias/medicina'},
      {ruta:"../../../../assets/logos/010.jpg", nombre:"Laboratorio", url: '/historias/laboratorio'},
      {ruta:"../../../../assets/logos/003.jpg", nombre:"Psicología", url: '/historias/psicologia'},
      {ruta:"../../../../assets/logos/026.JPG", nombre:"Optometría", url: '/historias/optometria'},
      {ruta:"../../../../assets/logos/021.JPG", nombre:"Certificaciones", url: '/historias/certificaciones'},
  ]

  opcionesContable: any = [ //Este es para el contador
      {ruta:"../../../../assets/logos/024.JPG", nombre:"Facturación"},
      {ruta:"../../../../assets/logos/007.jpg", nombre:"Consultas"},
      {ruta:"../../../../assets/logos/023.JPG", nombre:"Anulación"},
      {ruta:"../../../../assets/logos/028.JPG", nombre:"Recibos"},
  ]

  opcionesRecepcion: any = [ //Este es para secretarios
      {ruta:"../../../../assets/logos/007.jpg", nombre:"Consultas"},
      {ruta:"../../../../assets/logos/022.JPG", nombre:"Citas"},
      {ruta:"../../../../assets/logos/024.JPG", nombre:"Facturación"},
      {ruta:"../../../../assets/logos/019.JPG", nombre:"Registro", url: '/registro'},
      {ruta:"../../../../assets/logos/021.JPG", nombre:"Certificaciones"},
      {ruta:"../../../../assets/logos/023.JPG", nombre:"Cancelaciones"},
      {ruta:"../../../../assets/logos/025.JPG", nombre:"Remisiones"},
  ]

  get menuOpciones() {
    switch (this.auth.rol?.rol){
      case "MEDICO":
        return this.opcionesClinico;
      case "EMPLEADO":
        return this.opcionesRecepcion;
      case "PACIENTE":
        return this.opcionesPaciente;
      default:
        this.router.navigate(['/login'])
    }
  }
}
