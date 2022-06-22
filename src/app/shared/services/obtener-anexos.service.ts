import { HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ClientService } from 'src/app/shared/services/client.service';
import { environment } from 'src/environments/environment';
import { InformacionAnexos } from '../interfaces/informacion-anexos';

@Injectable({
  providedIn: 'root'
})
export class ObtenerAnexosService {

  constructor(private clientService: ClientService) {}

  getAnexos(valores: string[]): any{
    return this.clientService.get<InformacionAnexos>(`${environment.URLS.ANEXOS}/anexos`).pipe(
      map(
        (response: any) => {
          let data: any = {};
          valores.forEach((el: string) => {
            if (!response.hasOwnProperty(el)){ return; }
            data[el] = response[el];
          });
          return data as InformacionAnexos;
        }
    )
    )
  }

  formatear_datos(objeto: any, nombreInterno?: string, nombreVisual?:string): any{
    let data: {valor: string, nombre: string}[] = [];
    objeto.forEach((el: any) => {
      data.push(
        {
          valor: nombreInterno && nombreVisual ? el[nombreInterno] : el,
          nombre: nombreInterno && nombreVisual ? el[nombreVisual] : el
        }
      )
    })
    return data
  }

}
