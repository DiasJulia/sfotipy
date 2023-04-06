import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-esqueci_senha',
  templateUrl: './esqueci.component.html',
  styleUrls: ['./esqueci.component.css']
})
export class EsqueciComponent implements OnInit {

  EsqueciForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.EsqueciForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  get EsqueciFormControl() {
    return this.EsqueciForm.controls;
  }

  get email() {
    return this.EsqueciForm.get('email')!;
  }


  submit() {
    if (this.EsqueciForm.invalid) {
      return;
    }

    console.log("Enviou Formulario");
  }
}
