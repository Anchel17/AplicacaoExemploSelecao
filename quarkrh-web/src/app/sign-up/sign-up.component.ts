import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sign-up',
  imports: [MatTabsModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  public usuario: string;
  public senha: string;
  public confirmarSenha: string;

  public loginFormGroup: FormGroup;
  public cadastroFormGroup: FormGroup;

  constructor(private fb: FormBuilder){}

  ngOnInit(){
    this.inicializarForms();
  }

  onSubmitLoginForm(){
    console.log(this.loginFormGroup.value)
  }

  onSubmitCadastroForm(){
    console.log(this.cadastroFormGroup.value);
  }

  onTabChanged(){
    this.loginFormGroup.patchValue({
      login: '',
      senha: ''
    });

    this.cadastroFormGroup.patchValue({
      login: '',
      senha: '',
      confirmarSenha: ''
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
      confirmarSenha: ['', {validators: [Validators.required], updateOn: 'blur'}]
    });
  }
}
