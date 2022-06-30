import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ClientService } from './client.service';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class EnvioHistoriaService {

  constructor(
    private client: ClientService,
    private messages: MessagesService,
    private router: Router
  ) { }

  crearObjeto(llavesData: string[]){
    let data = {};
    llavesData.forEach(element => {
      data = Object.assign(data, JSON.parse(localStorage.getItem(element)!))
    });
    return data;
  }

  clearLocalStorage(llaveHistoria: string){
    Object.keys(localStorage).forEach((key) => {
      if (key.includes(llaveHistoria)) delete localStorage[key];
    });
    localStorage.removeItem("datos_paciente");
  }

  getUrl(destino:string): string | null{
    switch (destino){
      case "medicina":
        return environment.URLS.MEDICINA + environment.ENDPOINTS.HISTORIA_MEDICA;
      case "laboratorio":
        return environment.URLS.LABORATORIO + environment.ENDPOINTS.HISTORIA_LABORATORIO;
      case "psicologia":
        return environment.URLS.PSICOLOGIA + environment.ENDPOINTS.HISTORIA_PSICOLOGIA;
      case "optometria":
        return environment.URLS.OPTOMETRIA + environment.ENDPOINTS.HISTORIA_OPTOMETRIA;
      default:
        return null;
    }
  }

  enviarHistoria(destino: string, formValue: any, llaves: string[]){
    let datos_paciente = localStorage.getItem("datos_paciente");
    if(datos_paciente){
      let documento = (JSON.parse(datos_paciente)).documento;
      let historia: any = this.crearObjeto(llaves)
      historia = {...historia, ...formValue, documento_paciente: documento};
      if (historia){
        let url = this.getUrl(destino);
        if (url){
          this.client.post(url, historia)
          .subscribe(
            {
              next: (res: any) => {
                this.messages.success("Historia creada con éxito");
                this.clearLocalStorage(destino)
                this.router.navigate(['/recepcion']);
              },
              error: (err: any) => {
                console.log(err.error.response)
              }
            }
          )
        }
        else{
          console.warn("Verifique el destino")
        }
      }else {
        this.messages.error("Error en el formulario");
      }
    }
    else{
      this.messages.error("No ha ingresado un documento de un paciente en la sección de datos del paciente");
    }
  }
}
