import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FuncionarioDTO } from '../../DTO/FuncionarioDTO';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { FuncionarioModalComponent } from './funcionario-modal/funcionario-modal.component';
import { FuncionarioService } from './funcionario.service';
import { HttpClientModule } from '@angular/common/http';
import { SignUpService } from '../sign-up/sign-up.service';

@Component({
  selector: 'app-tabela-funcionarios',
  imports: [MatTableModule, MatIconModule, MatIcon, HttpClientModule],
  templateUrl: './tabela-funcionarios.component.html',
  styleUrl: './tabela-funcionarios.component.css',
  providers: [FuncionarioService, SignUpService]
})
export class TabelaFuncionariosComponent {
  readonly dialog = inject(MatDialog);

  public displayedColumns: string[] = ['nome', 'cargo', 'salario', 'dataAdmissao', 'acao'];
  public dataSource: FuncionarioDTO[];

  constructor(private funcionarioService: FuncionarioService, private signUpService: SignUpService){}

  openDialog(isEdicao: boolean, funcionario: any = null, isDeletar: any = null) {
    const dialogRef = this.dialog.open(FuncionarioModalComponent, {
      data: {
        isEdicao: isEdicao,
        funcionario: funcionario,
        isDeletar: isDeletar
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.carregarDataSource();
    });
  }

  ngOnInit(){
    this.carregarDataSource();
  }

  public editFuncionario(funcionario: FuncionarioDTO){
    this.openDialog(true, funcionario);
  }

  public deleteFuncionario(funcionario: FuncionarioDTO){
    this.openDialog(false, funcionario, true);
  }

  private carregarDataSource(){
    this.funcionarioService.carregarFuncionarios()
      .subscribe(response => {
        this.dataSource = response
      });
  }

  public solicitarLogout(){
    this.signUpService.logout();
  }
}
