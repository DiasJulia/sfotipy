import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

import { CustomvalidationService } from './Validators_extras';

import { Router } from '@angular/router';

import { User } from '../../../../common/User'
import { RegisterService } from './cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class RegisterComponent implements OnInit {

  RegisterForm!: FormGroup;
  submitted!: false;

  constructor(
    private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    private registerService: RegisterService,
    private router: Router,
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

    let data = this.RegisterForm.value;


    if (this.RegisterForm.valid) {
      data = new User({
        name: data.nome,
        email: data.email,
        password: data.senha
      })

      this.registerService.emailExists(data.email).subscribe(
        emailExists => {
          if (emailExists) {
            this.email.setErrors({ 'emailExists': true });
          } else {
            this.registerService.addUser(data).subscribe(
              dataServer => {
                this.RegisterForm.reset();
                setTimeout(() => {
                  this.router.navigate(['login']);
                }, 1000);
              }
            )
          }
        }
      )

    } else {
      console.log('envio não efetuado');
    }
  }
}