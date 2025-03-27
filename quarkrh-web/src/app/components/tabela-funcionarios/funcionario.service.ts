import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FuncionarioDTO } from "../../DTO/FuncionarioDTO";

@Injectable()
export class FuncionarioService{
  private API_URL = 'http://localhost:8080/funcionario';
  constructor(private httpClient: HttpClient){}

  public cadastrarFuncionario(FuncionarioDTO: FuncionarioDTO){
    this.httpClient.post(this.API_URL, FuncionarioDTO)
    .subscribe(response =>
      console.log(response)
    );
  }
}
