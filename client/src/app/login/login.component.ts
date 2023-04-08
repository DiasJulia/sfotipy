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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private userService: UserService,
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
    else {
      this.loginService.login(this.LoginForm.value).subscribe(
        dataServer => {
          if (dataServer.length > 0) {
            if (this.senha.value == dataServer[0].password) {
              if (dataServer[0] && dataServer[0].id) {
                alert('logado com sucesso ');
                //this.userService.setUserId(dataServer[0].id);
                this.loginService.updateLoginStatus(true);
                this.router.navigate(['']);
              }
            } else {
              this.LoginForm.reset();
              alert('usuario ou senha invalidos!')
            }
          } else {
            this.LoginForm.reset();
            alert('usuario ou senha invalidos!')
          }
        }
      );
    }

  }


}
