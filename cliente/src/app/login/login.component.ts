import { Component, OnInit } from '@angular/core';

import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm!: FormGroup
  submitted = false;

  constructor(
    private fb: FormBuilder) { }

  ngOnInit(): void {
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
    if (this.LoginForm.invalid) {
      return;
    }

    console.log("Enviou Formulario");
  }

}
