import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginDTO } from "../../DTO/LoginDTO";

@Injectable()
export class SignUpService {
  private API_URL = 'http://localhost:8080/auth/';
  constructor(private httpClient: HttpClient){}

  public login(loginDTO: LoginDTO){
    this.httpClient.post(this.API_URL + "login", loginDTO, {responseType: 'text'})
      .subscribe(response =>
        console.log(response)
      );
  }
}
