import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Devolucoes } from './components/devolucoes/devolucoes';
import { Emprestimos } from './components/emprestimos/emprestimos';
import { Login } from './components/login/login';
import { Adm } from './components/adm/adm';
import { Cadastro } from './components/cadastro/cadastro';


export const routes: Routes = [
  { path: '', component: Home}, // primeira tela
  { path: 'emprestimos/registrar', component: Emprestimos },
  { path: 'emprestimos/verEmprestimos', component: Devolucoes },
  { path: 'auth/criar', component: Cadastro },
  { path: 'auth/login', component: Login },
  { path: 'adm/todosEmprestimos', component: Adm}
];
