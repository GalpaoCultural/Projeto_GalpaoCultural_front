import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth-service';
import { LoginUserDto } from '../../model/LoginUserDto';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  login = new LoginUserDto;

  erro = '';
  carregando = false;
  mostrarSenha = false;

  constructor(
    private authService: AuthService,
    private router: Router, private snackBar: MatSnackBar
  ) { }

  mostrarMensagem() {
    this.snackBar.open('Usuário não cadastrado!', 'Fechar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  async fazerLogin(form: NgForm) {
    try {
      // Verificação dos campos
      if (!this.login?.email?.trim() || !this.login?.password?.trim()) {
        this.erro = 'Por favor, preencha todos os campos';
        return;
      }

      this.carregando = true;

      const loginResponse = await this.authService.login(this.login);
      localStorage.setItem("accessToken", loginResponse.token);

      this.carregando = false;
      this.router.navigate(['/adm/todosEmprestimos']);

    } catch (error: any) {
      this.carregando = false;
      this.mostrarMensagem();
      form.resetForm();
    }
  }


  toggleMostrarSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }
}

