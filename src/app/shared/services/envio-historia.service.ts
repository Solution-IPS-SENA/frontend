import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvioHistoriaService {

  constructor() { }


  enviarHistoria(llavesData: string[]){
    let data = {};
    llavesData.forEach(element => {
      data = Object.assign(data, JSON.parse(localStorage.getItem(element)!))
    });
    return data;
  }
}
