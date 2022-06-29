import { Component, EventEmitter, NgModule, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';
import { filter } from 'rxjs';
import { ClientService } from 'src/app/shared/services/client.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})


export class AuthLoginComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private client: ClientService,
    private auth: AuthService,
    private route: Router,
    private messages: MessagesService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      emailLogin: ['', [Validators.required, Validators.email]],
      passwordLogin: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(200)]]
    });
  }

  onSubmit(){
    if (this.form.valid) {
      this.client.post(environment.URLS.AUTH + environment.ENDPOINTS.LOGIN, {
        correo: this.form.value.emailLogin,
        password: this.form.value.passwordLogin
      })
      .subscribe(
        {
          next: (res: any) => {
          //se almacena el token usando el servicio Auth
            this.auth.login(res.token)
            //se almacena el nombre del usuario en el almacenamiento de
            //sesion
            this.route.navigate( ['/recepcion'])
          },
          error: (err) => {
            this.messages.error(err.error.response)
          }
        }
      )
    }else {
      this.messages.error("Error en el formulario");
    }
  }
}
