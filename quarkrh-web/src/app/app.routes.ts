import { Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TabelaFuncionariosComponent } from './components/tabela-funcionarios/tabela-funcionarios.component';

export const routes: Routes = [
  {path: '', component: TabelaFuncionariosComponent},
  {path: 'signUp', component: SignUpComponent}
];
