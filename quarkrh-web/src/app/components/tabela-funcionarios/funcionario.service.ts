import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FuncionarioDTO } from "../../DTO/FuncionarioDTO";
import { Observable, Subscription } from "rxjs";

@Injectable()
export class FuncionarioService{
  private API_URL = 'http://localhost:8080/funcionario';
  constructor(private httpClient: HttpClient){}

  public cadastrarFuncionario(funcionarioDTO: FuncionarioDTO){
    this.httpClient.post(this.API_URL, funcionarioDTO)
      .subscribe();
  }

  public alterarFuncionario(funcionarioDTO: FuncionarioDTO, idFuncionario: number){
    this.httpClient.put(this.API_URL + `/${idFuncionario}`, funcionarioDTO)
      .subscribe()
  }

  public deletarFuncionario(idFuncionario?: number){
    this.httpClient.delete(this.API_URL + `/${idFuncionario}`)
      .subscribe();
  }

  public carregarFuncionarios(): Observable<any>{
    return this.httpClient.get(this.API_URL);
  }
}
