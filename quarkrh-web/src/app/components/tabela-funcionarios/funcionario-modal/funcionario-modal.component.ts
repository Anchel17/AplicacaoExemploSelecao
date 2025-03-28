import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule} from '@angular/material/core';
import { FuncionarioService } from '../funcionario.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CurrencyMaskModule } from "ng2-currency-mask";

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
    private funcionarioService: FuncionarioService
  ){}

  ngOnInit(){
    this.dateAdapter.setLocale('br');
    this.data.isEdicao ? this.inicializarFormComDados() : this.inicializarForm();
    this.maxDate = new Date();
    this.maxDate.setUTCDate(this.maxDate.getUTCDate())
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
  }

  private callDeletarFuncionario(){
    this.funcionarioService.deletarFuncionario(this.data.funcionario.id);
  }

  private inicializarForm(){
    this.funcionarioForm = this.fb.group({
      nome: ['', {validators: [Validators.required], updateOn: 'blur'}],
      cargo: ['', {validators: [Validators.required], updateOn: 'blur'}],
      salario: ['', {validators: [Validators.required], updateOn: 'blur'}],
      dataAdmissao: ['', {validators: [Validators.required], updateOn: 'blur'}]
    })
  }

  private inicializarFormComDados(){
    this.funcionarioForm = this.fb.group({
      nome: [this.data.funcionario.nome, {validators: [Validators.required], updateOn: 'blur'}],
      cargo: [this.data.funcionario.cargo, {validators: [Validators.required], updateOn: 'blur'}],
      salario: [this.data.funcionario.salario, {validators: [Validators.required], updateOn: 'blur'}],
      dataAdmissao: [this.data.funcionario.dataAdmissao, {validators: [Validators.required], updateOn: 'blur'}]
    })
  }
}
