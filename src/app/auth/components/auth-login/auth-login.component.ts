import { Component, EventEmitter, NgModule, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ClientService } from 'src/app/shared/services/client.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})


export class AuthLoginComponent implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder, private client: ClientService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      emailLogin: ['', [Validators.required, Validators.email]],
      passwordLogin: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(200)]]
    });
  }

  async onSubmit(){
    if (this.form.valid) {
      this.client.post(environment.API_AUTH_URL + environment.LOGIN_ENDPOINT, {
        email: this.form.value.emailLogin,
        password: this.form.value.passwordLogin
      }).subscribe()
    }else {
      console.log("Form error");
    }
  }



}
