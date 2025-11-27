import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../../service/auth-service';
import { createUserDto } from '../../model/createUserDto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastro',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {
  user = new createUserDto;
  erro = '';
  mostrarSenha = false;
  carregando = false;


  constructor(private http: HttpClient, 
    private authservice: AuthService, 
    private router: Router, private snackBar: MatSnackBar) {}

  mostrarMensagem() {
    this.snackBar.open('Usuário cadastrado com sucesso!', 'Fechar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  async fazerCadastro(){
    if (!this.user?.nome?.trim() || !this.user?.email?.trim() || !this.user?.password?.trim()) {
      this.erro = 'Por favor, preencha todos os campos';
      return;
    }


    await this.authservice.cadastro(this.user)
    this.mostrarMensagem();
    this.router.navigate(['/auth/login']);
    

  }


  toggleMostrarSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }
}
