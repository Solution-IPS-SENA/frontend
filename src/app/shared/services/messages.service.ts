import { Injectable } from '@angular/core';
import  Swal  from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  success(message: string) {
    Swal.fire({
      text: message,
      icon: 'success',
      timer: 2000,
      timerProgressBar: true,
      showCancelButton: false,
      showConfirmButton: false
    })
  }

  error(message: string) {
    Swal.fire({
      text: message,
      icon: 'error',
      timer: 2000,
      timerProgressBar: true,
      showCancelButton: false,
      showConfirmButton: false
    })}
}
