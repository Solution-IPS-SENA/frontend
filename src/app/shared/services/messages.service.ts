import { Injectable } from '@angular/core';
import  Swal  from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  success(message: string) {
    Swal.fire({
      title: 'Error!',
      text: message,
      icon: 'error',
      confirmButtonText: 'Cool'
    })
  }

  error(message: string) {
    Swal.fire({
      text: message,
      icon: 'error',
      timer: 1200,
      timerProgressBar: true,
      showCancelButton: false,
      showConfirmButton: false
    })}
}
