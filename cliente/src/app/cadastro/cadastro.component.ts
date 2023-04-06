import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

import { CustomvalidationService } from './Validators_extras';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class RegisterComponent implements OnInit {

  RegisterForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private customValidator: CustomvalidationService
  ) { }

  ngOnInit(): void {
    this.RegisterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
      ConfirmarSenha: ['', [Validators.required]],
      nome: ['', Validators.required],
    },
      {
        validator: this.customValidator.MatchPassword('senha', 'ConfirmarSenha'),
      }
    );
  }
  get registerFormControl() {
    return this.RegisterForm.controls;
  }

  get email() {
    return this.RegisterForm.get('email')!;
  }
  get senha() {
    return this.RegisterForm.get('senha')!;
  }
  get ConfirmarSenha() {
    return this.RegisterForm.get('ConfirmarSenha')!;
  }
  get nome() {
    return this.RegisterForm.get('nome')!;
  }



  submit() {
    if (this.RegisterForm.invalid) {
      return;
    }

    console.log("Enviou Formulario");
  }

}

