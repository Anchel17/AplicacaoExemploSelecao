import { Component, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTab, MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { SignUpService } from './sign-up.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [MatTabsModule, MatFormFieldModule, MatInputModule, FormsModule,
    MatButtonModule, ReactiveFormsModule, MatSelectModule, HttpClientModule,
    CommonModule, RouterModule],
  providers: [SignUpService],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  public role: string;

  @ViewChild("formLogin") formLoginElement: NgForm;
  @ViewChild("formCadastro") formCadastroElement: NgForm;

  public loginFormGroup: FormGroup;
  public cadastroFormGroup: FormGroup;

  public credenciaisInvalidas: boolean;
  public cadastroSucesso: boolean;

  constructor(private fb: NonNullableFormBuilder, private signUpService: SignUpService, private router: Router){}

  ngOnInit(){
    this.inicializarForms();
  }

  get login(){
    return this.loginFormGroup.get('login')!;
  }

  get senha(){
    return this.loginFormGroup.get('senha')!;
  }

  get cadastroFormLogin(){
    return this.cadastroFormGroup.get('login')!;
  }

  get cadastroFormSenha(){
    return this.cadastroFormGroup.get('senha')!;
  }

  get cadastroFormRole(){
    return this.cadastroFormGroup.get('role')!;
  }

  onSubmitLoginForm(){
    if(this.loginFormGroup.invalid){
      return;
    }

    this.signUpService.login({login: this.loginFormGroup.value.login, password: this.loginFormGroup.value.senha})
      .subscribe(response => {
        if(response && response.trim() != ''){
          localStorage.setItem('token', response);
          this.router.navigate(['/']);
          this.credenciaisInvalidas = false;
        }
        else{
          this.credenciaisInvalidas = true;
        }
      });
  }

  onSubmitCadastroForm(){
    if(this.cadastroFormGroup.invalid){
      return;
    }

    this.signUpService.cadastrar({
      login: this.cadastroFormGroup.value.login,
      password: this.cadastroFormGroup.value.senha,
      role: this.cadastroFormGroup.value.role
    }).subscribe(response => {
      if(response){
        this.cadastroSucesso = true;
      }
    }, (err) => this.cadastroSucesso = false);
  }

  onTabChanged(){
    this.formLoginElement.resetForm();
    this.formCadastroElement.resetForm();
  }

  private inicializarForms(){
    this.loginFormGroup = this.fb.group({
      login: ['', {validators: [Validators.required], updateOn: 'change'}],
      senha: ['', {validators: [Validators.required], updateOn: 'change'}]
    });

    this.cadastroFormGroup = this.fb.group({
      login: ['', {validators: [Validators.required], updateOn: 'change'}],
      senha: ['', {validators: [Validators.required], updateOn: 'change'}],
      role: ['', {validators: [Validators.required], updateOn: 'change'}]
    });
  }
}
