import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import jwt_decode from 'jwt-decode';

type Rol = {
  correo: string,
  documento: string,
  rol: string,
}
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
    return null;
  }

  //método que nos permite romover el token almacenado y el nombre del
  //usuario actual y enviar una señal al BehaviorSubject para establecer
  //su nuevo valor, en este caso false para indicar que no estamos logueados
  logout() : void {
    localStorage.clear();
    this.isLogin.next(false);
  }

  get rol(): Rol | null{
    let token = this.getToken();
    if (token){
      return this.getDecodedAccessToken(token);
    }
    return null

  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  //método que nos retorna el BehaviorSubject cómo un observable
  isLoggedIn() : Observable<boolean> {
    return this.isLogin.asObservable();
   }
}
