import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ClientService } from './client.service';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(
    private _client: ClientService
  ) {}

  obtenerPaciente(numDoc: string){
    return this._client.get(`${environment.API_AUTH_URL}/paciente`)
  }
}
