import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FuncionarioDTO } from '../../DTO/FuncionarioDTO';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tabela-funcionarios',
  imports: [MatTableModule, MatIconModule, MatIcon],
  templateUrl: './tabela-funcionarios.component.html',
  styleUrl: './tabela-funcionarios.component.css'
})
export class TabelaFuncionariosComponent {
  public displayedColumns: string[] = ['nome', 'cargo', 'salario', 'dataAdmissao', 'acao'];
  public dataSource: FuncionarioDTO[] = [{nome: 'Cleitin', cargo: 'Repositor', salario: 2500.00, dataAdmissao: '21/01/2001'}];
  constructor(){}

  ngOnInit(){}

  public editFuncionario(funcionario: FuncionarioDTO){
    console.log(funcionario);
  }

  public deleteFuncionario(funcionario: FuncionarioDTO){
    console.log(funcionario);
  }
}
