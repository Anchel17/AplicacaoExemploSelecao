import { Injectable } from "@angular/core";
import { jwtDecode } from '../../node_modules/jwt-decode';

@Injectable()
export class JwtDecoderService{
  constructor(){}

  public getUserPermission(){
    const token = this.getToken();

    if(!token){
      return [];
    }

    const decodedToken: any = jwtDecode(token);

    return decodedToken.role || [];
  }

  private getToken(): string | null {
    return localStorage.getItem('token'); // Pegando o token armazenado
  }
}
