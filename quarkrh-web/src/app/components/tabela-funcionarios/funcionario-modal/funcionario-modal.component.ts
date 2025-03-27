import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule} from '@angular/material/core';
import { FuncionarioService } from '../funcionario.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-funcionario-modal',
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule,
    FormsModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule, HttpClientModule],
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
    return this.data.isEdicao ? 'Editar Funcionário' : 'Cadastrar Funcionário'
  }

  public submitFuncionarioForm(){
    if(!this.validarData()){
      alert("DATA INVÁLIDA!\nPOR FAVOR FORNEÇA UMA DATA NO FORMATO: DD/MM/AAAA");
      return;
    }


    let dataAdmissaoValida = this.tratarDataRecebida();
    this.funcionarioService.cadastrarFuncionario(

      {nome: this.funcionarioForm.value.nome,
       cargo: this.funcionarioForm.value.cargo,
       salario: this.funcionarioForm.value.salario,
       dataAdmissao: dataAdmissaoValida
      }
    );
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

  }

  private validarData(){
    let dataRaw = this.funcionarioForm.value.dataAdmissao;

    if(this.formatoValido(dataRaw)){
      return true;
    }

    return false;
  }

  private formatoValido(dataRaw: string){
    return dataRaw.split('/').length == 3;
  }

  private tratarDataRecebida(){
    let dataRaw = this.funcionarioForm.value.dataAdmissao;
    let dataDiaMesAno = dataRaw.split('/');

    return dataDiaMesAno[2] + '-' + dataDiaMesAno[1] + '-' + dataDiaMesAno[0];
  }
}
