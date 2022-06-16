import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogin = new BehaviorSubject<boolean>(this.checkToken());

  //método que nos permitirá chequear si existe un token, en tal
  //caso retornará true
  private checkToken() : boolean {
    return !!localStorage.getItem('token');
  }

  //método que nos permite establecer el token en el almacenamiento local
  //y enviar una señal del BehaviorSubject para establecer su nuevo valor en
  //true para indicar que estamos logueados
  login(token:string) : void {
    localStorage.setItem('token', token);
    this.isLogin.next(true);
  }

  //método que nos permite eliminar el nombre de usuario
  getToken() {
    if (this.checkToken()){
      return localStorage.getItem('token')
    }
    return "No hay token";
  }

  //método que nos permite romover el token almacenado y el nombre del
  //usuario actual y enviar una señal al BehaviorSubject para establecer
  //su nuevo valor, en este caso false para indicar que no estamos logueados
  logout() : void {
    localStorage.removeItem('token');
    this.isLogin.next(false);
  }

  //método que nos retorna el BehaviorSubject cómo un observable
  isLoggedIn() : Observable<boolean> {
    return this.isLogin.asObservable();
   }
}
