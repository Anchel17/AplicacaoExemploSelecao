import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule} from '@angular/material/core';
import { FuncionarioService } from '../funcionario.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { dataNoFuturoValidator } from '../../../validators/dataNoFuturoValidator';
import { salarioPositivoValidator } from '../../../validators/salarioPositivoValidator';

@Component({
  selector: 'app-funcionario-modal',
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule,
    FormsModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule,
    HttpClientModule, CommonModule, CurrencyMaskModule],
  templateUrl: './funcionario-modal.component.html',
  styleUrl: './funcionario-modal.component.css',
  providers: [FuncionarioService]
})
export class FuncionarioModalComponent {
  data = inject(MAT_DIALOG_DATA)

  public maxDate: Date;
  public funcionarioForm: FormGroup;

  constructor(private fb: FormBuilder, private dateAdapter: DateAdapter<any>,
    private funcionarioService: FuncionarioService, private dialogRef: MatDialogRef<FuncionarioModalComponent>
  ){}

  ngOnInit(){
    this.dateAdapter.setLocale('br');
    this.data.isEdicao ? this.inicializarFormComDados() : this.inicializarForm();
    this.maxDate = new Date();
    this.maxDate.setUTCDate(this.maxDate.getUTCDate())
  }

  get nome(){
    return this.funcionarioForm.get('nome')!;
  }

  get cargo(){
    return this.funcionarioForm.get('cargo')!;
  }

  get salario(){
    return this.funcionarioForm.get('salario')!;
  }

  get dataAdmissao(){
    return this.funcionarioForm.get('dataAdmissao')!;
  }

  public getModalTitle(){
    return this.data.isEdicao ? 'Alterar Funcionário' : 'Cadastrar Funcionário'
  }

  public getSubmitButtonText(){
    if(this.data.isDeletar){
      return 'Deletar';
    }

    return this.data.isEdicao ? 'Alterar' : 'Cadastrar'
  }

  public submitFuncionarioForm(){
    if(this.data.isDeletar){
      this.callDeletarFuncionario();
      return;
    }

    if(this.funcionarioForm.invalid){
      return;
    }

    if(this.data.isEdicao){
      this.callAlterarFuncionario(this.funcionarioForm.value.dataAdmissao)
      return;
    }

    this.funcionarioService.cadastrarFuncionario(
      {nome: this.funcionarioForm.value.nome,
       cargo: this.funcionarioForm.value.cargo,
       salario: this.funcionarioForm.value.salario,
       dataAdmissao: this.funcionarioForm.value.dataAdmissao
      }
    );

    this.dialogRef.close(this.funcionarioForm.value);
  }

  public isValidForm(): boolean{
    return this.funcionarioForm.valid;
  }

  private callAlterarFuncionario(dataAdmissaoValida: string){
    this.funcionarioService.alterarFuncionario(
      {nome: this.funcionarioForm.value.nome,
       cargo: this.funcionarioForm.value.cargo,
       salario: this.funcionarioForm.value.salario,
       dataAdmissao: dataAdmissaoValida
      },
      this.data.funcionario.id
    );

    this.dialogRef.close(this.funcionarioForm.value);
  }

  private callDeletarFuncionario(){
    this.funcionarioService.deletarFuncionario(this.data.funcionario.id);

    this.dialogRef.close(this.funcionarioForm.value);
  }

  private inicializarForm(){
    this.funcionarioForm = this.fb.group({
      nome: ['', {validators: [Validators.required], updateOn: 'change'}],
      cargo: ['', {validators: [Validators.required], updateOn: 'change'}],
      salario: ['', {validators: [Validators.required, salarioPositivoValidator], updateOn: 'change'}],
      dataAdmissao: ['', {validators: [Validators.required, dataNoFuturoValidator], updateOn: 'change'}]
    })
  }

  private inicializarFormComDados(){
    this.funcionarioForm = this.fb.group({
      nome: [this.data.funcionario.nome, {validators: [Validators.required], updateOn: 'change'}],
      cargo: [this.data.funcionario.cargo, {validators: [Validators.required], updateOn: 'change'}],
      salario: [this.data.funcionario.salario, {validators: [Validators.required, salarioPositivoValidator], updateOn: 'change'}],
      dataAdmissao: [this.data.funcionario.dataAdmissao, {validators: [Validators.required, dataNoFuturoValidator], updateOn: 'change'}]
    })
  }
}
