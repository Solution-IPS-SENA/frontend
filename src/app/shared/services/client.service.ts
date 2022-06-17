import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { catchError, filter, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) {}

  get<T>(url: string): Observable<HttpEvent<T>>{
    let config: any = {
      responseType: "json"
    };
    return this.http.get<T>(url, config);
  }

  post(url: string, data?:object, token?: string){
    let config: any = {
      responseType: "json"
    };
    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = header;
    };
    return this.http.post(url, data, config)
  }

}
