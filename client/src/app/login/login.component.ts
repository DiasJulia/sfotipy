import { Component, OnInit } from '@angular/core';

import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string = '';
  LoginForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    //console.log('Mensagem recebida: ', this.message);
    this.LoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  get LoginFormControl() {
    return this.LoginForm.controls;
  }

  get email() {
    return this.LoginForm.get('email')!;
  }
  get senha() {
    return this.LoginForm.get('senha')!;
  }

  submit() {
    this.submitted = true;
    if (this.LoginForm.invalid) {
      return;
    }

    console.log("Enviou Formulario");
  }


}
