import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginDTO } from "../../DTO/LoginDTO";
import { RegisterDTO } from "../../DTO/RegisterDTO";
import { Router } from "@angular/router";

@Injectable()
export class SignUpService {
  private API_URL = 'http://localhost:8080/auth/';
  constructor(private httpClient: HttpClient, private router: Router){}

  public login(loginDTO: LoginDTO){
    try{
      this.httpClient.post(this.API_URL + "login", loginDTO, {responseType: 'text'})
        .subscribe(response => {
        localStorage.setItem('token', response);
        this.router.navigate(['/']);
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

  public logout(){
    localStorage.clear();

    this.router.navigate(['/signUp']);
  }
}
