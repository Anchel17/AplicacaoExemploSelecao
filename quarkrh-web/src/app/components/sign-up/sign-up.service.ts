import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginDTO } from "../../DTO/LoginDTO";
import { RegisterDTO } from "../../DTO/RegisterDTO";

@Injectable()
export class SignUpService {
  private API_URL = 'http://localhost:8080/auth/';
  constructor(private httpClient: HttpClient){}

  public login(loginDTO: LoginDTO){
    try{
      this.httpClient.post(this.API_URL + "login", loginDTO, {responseType: 'text'})
        .subscribe(response => {
        localStorage.setItem('token', response);
      });
    }
    catch(error){
      alert(error)
    }

  }

  public cadastrar(registerDTO: RegisterDTO){
    this.httpClient.post(this.API_URL + "register", registerDTO)
      .subscribe(response =>
        console.log(response)
      );
  }
}
