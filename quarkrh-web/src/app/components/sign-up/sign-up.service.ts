import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginDTO } from "../../DTO/LoginDTO";
import { RegisterDTO } from "../../DTO/RegisterDTO";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class SignUpService {
  private API_URL = 'http://localhost:8080/auth/';
  constructor(private httpClient: HttpClient, private router: Router){}

  public login(loginDTO: LoginDTO): Observable<string>{
      return this.httpClient.post(this.API_URL + "login", loginDTO, {responseType: 'text'});
  }

  public cadastrar(registerDTO: RegisterDTO): Observable<Object>{
    return this.httpClient.post(this.API_URL + "register", registerDTO);
  }

  public logout(){
    localStorage.clear();

    this.router.navigate(['/signUp']);
  }
}
