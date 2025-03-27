import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { SignUpService } from './sign-up.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-sign-up',
  imports: [MatTabsModule, MatFormFieldModule, MatInputModule, FormsModule,
    MatButtonModule, ReactiveFormsModule, MatSelectModule, HttpClientModule],
  providers: [SignUpService],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  public usuario: string;
  public senha: string;
  public role: string;

  public loginFormGroup: FormGroup;
  public cadastroFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private signUpService: SignUpService){}

  ngOnInit(){
    this.inicializarForms();
  }

  onSubmitLoginForm(){
    this.signUpService.login({login: this.loginFormGroup.value.login, password: this.loginFormGroup.value.senha});
  }

  onSubmitCadastroForm(){
    this.signUpService.cadastrar({
      login: this.cadastroFormGroup.value.login,
      password: this.cadastroFormGroup.value.senha,
      role: this.cadastroFormGroup.value.role
    })
  }

  onTabChanged(){
    this.loginFormGroup.patchValue({
      login: '',
      senha: ''
    });

    this.cadastroFormGroup.patchValue({
      login: '',
      senha: '',
      role: ''
    });
  }

  private inicializarForms(){
    this.loginFormGroup = this.fb.group({
      login: ['', {validators: [Validators.required], updateOn: 'blur'}],
      senha: ['', {validators: [Validators.required], updateOn: 'blur'}]
    });

    this.cadastroFormGroup = this.fb.group({
      login: ['', {validators: [Validators.required], updateOn: 'blur'}],
      senha: ['', {validators: [Validators.required], updateOn: 'blur'}],
      role: ['', {validators: [Validators.required], updateOn: 'blur'}]
    });
  }
}
