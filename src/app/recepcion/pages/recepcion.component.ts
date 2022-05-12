import { Component } from "@angular/core";

@Component({
    selector: 'recepcion',
    templateUrl: './recepcion.html',
})
export class RecepcionComponent { 

    opcionesAdminPaciente: any = [
        {ruta:"https://i.imgur.com/54T21mn.jpeg", nombre:"Citas"},
        {ruta:"https://i.imgur.com/3mmdq4F.jpeg", nombre:"Cancelaciones"},
        {ruta:"https://i.imgur.com/WUc32cB.jpeg", nombre:"Pagos"},
        {ruta:"https://i.imgur.com/T30LLEB.jpeg", nombre:"Remisiones"},
        {ruta:"https://i.imgur.com/T30LLEB.jpeg", nombre:"Certificaciones"},
    ]

    opcionesClinico: any = [
        {ruta:"https://i.imgur.com/54T21mn.jpeg", nombre:"Medicina"},
        {ruta:"https://i.imgur.com/3mmdq4F.jpeg", nombre:"Laboratorio"},
        {ruta:"https://i.imgur.com/WUc32cB.jpeg", nombre:"Psicologia"},
        {ruta:"https://i.imgur.com/T30LLEB.jpeg", nombre:"Optometria"},
        {ruta:"https://i.imgur.com/T30LLEB.jpeg", nombre:"Fonoaudiologia"},
        {ruta:"https://i.imgur.com/T30LLEB.jpeg", nombre:"Certificaciones"},
    ]

    opcionesContable: any = [
        {ruta:"https://i.imgur.com/54T21mn.jpeg", nombre:"Facturacion"},
        {ruta:"https://i.imgur.com/3mmdq4F.jpeg", nombre:"Consultas"},
        {ruta:"https://i.imgur.com/WUc32cB.jpeg", nombre:"Anulacion"},
        {ruta:"https://i.imgur.com/T30LLEB.jpeg", nombre:"Recibos"},
    ]

    opcionesRecepcion: any = [
        {ruta:"https://i.imgur.com/54T21mn.jpeg", nombre:"Consultas"},
        {ruta:"https://i.imgur.com/3mmdq4F.jpeg", nombre:"Citas"},
        {ruta:"https://i.imgur.com/WUc32cB.jpeg", nombre:"Facturacion"},
        {ruta:"https://i.imgur.com/T30LLEB.jpeg", nombre:"Registro Paciente"},
        {ruta:"https://i.imgur.com/T30LLEB.jpeg", nombre:"Certificaciones"},
        {ruta:"https://i.imgur.com/T30LLEB.jpeg", nombre:"Cancelaciones"},
        {ruta:"https://i.imgur.com/T30LLEB.jpeg", nombre:"Remisiones"},
        {ruta:"https://i.imgur.com/T30LLEB.jpeg", nombre:"Registro Personal"},
    ]
}