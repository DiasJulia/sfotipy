import { Component, OnInit } from '@angular/core';

import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string = '';
  LoginForm!: FormGroup;
  submitted = false;
  erro_servidor: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    //console.log('Mensagem recebida: ', this.message);
    this.redirectToHomePage();
    this.LoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  redirectToHomePage() {
    this.loginService.getLoginStatus().subscribe(isLogged => { //Função que verifica se o usuário está logado. Caso sim, não faz sentido as telas de Login e cadastro
      if (isLogged) {
        this.router.navigate(['']); // Redireciona o usuário para a tela principal caso ele esteja logado
      }
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
    else {
      const email = String(this.email.value).toLowerCase();
      const password = this.senha.value;

      this.loginService.login(email, password).subscribe(
        dataServer => {
          console.log(dataServer);
          if (dataServer.success) {
            this.erro_servidor = true;
            this.userService.setUserId(dataServer.id);
            this.loginService.updateLoginStatus(true);
            this.router.navigate(['']);
          }
          else {
            this.erro_servidor = false;
            this.LoginForm.reset();
            setTimeout(() => {
              location.reload()
            }, 1500);
          }
        }
      );
    }
  }

}
