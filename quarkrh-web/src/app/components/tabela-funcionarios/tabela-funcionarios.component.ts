import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FuncionarioDTO } from '../../DTO/FuncionarioDTO';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { FuncionarioModalComponent } from './funcionario-modal/funcionario-modal.component';

@Component({
  selector: 'app-tabela-funcionarios',
  imports: [MatTableModule, MatIconModule, MatIcon],
  templateUrl: './tabela-funcionarios.component.html',
  styleUrl: './tabela-funcionarios.component.css'
})
export class TabelaFuncionariosComponent {
  readonly dialog = inject(MatDialog);

  public displayedColumns: string[] = ['nome', 'cargo', 'salario', 'dataAdmissao', 'acao'];
  public dataSource: FuncionarioDTO[] = [{nome: 'Cleitin', cargo: 'Repositor', salario: 2500.00, dataAdmissao: '21/01/2001'}];

  constructor(){}

  openDialog(isEdicao: boolean) {
    const dialogRef = this.dialog.open(FuncionarioModalComponent, {
      data: {
        isEdicao: isEdicao,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(){
    this.openDialog(false);
  }

  public editFuncionario(funcionario: FuncionarioDTO){
    console.log(funcionario);
  }

  public deleteFuncionario(funcionario: FuncionarioDTO){
    console.log(funcionario);
  }
}
