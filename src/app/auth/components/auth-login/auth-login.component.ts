import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})


export class AuthLoginComponent implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      usuarioLogin: ['', Validators.required ],
      passwordLogin: ['', Validators.required]
    });
  }

  async onSubmit(){
    if (this.form.valid) {
      let usuario = this.form.value.usuarioLogin;
      let password = this.form.value.passwordLogin;
      console.log("yas", usuario, password);
    } else {
      console.log("Form error");
    }
  }


}
