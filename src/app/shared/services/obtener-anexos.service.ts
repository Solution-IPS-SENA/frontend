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
    return this.clientService.get<InformacionAnexos>(`${environment.API_ANEXOS_URL}/anexos`).pipe(
      map(
        (response: any) => {
          let data: InformacionAnexos[] = [];
          valores.forEach((el: string) => {
            if (response[el] != undefined){
            }
          });
          return data;
        }
    )
    )
  }

}
