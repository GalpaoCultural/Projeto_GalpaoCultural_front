import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { EmprestimoService } from '../../service/emprestimo-service';
import { EmprestimoDto } from '../../model/emprestimoDto';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-emprestimos',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, MatSnackBarModule],
  templateUrl: './emprestimos.html',
  styleUrl: './emprestimos.css',
})
export class Emprestimos {
  emprestimo: EmprestimoDto = new EmprestimoDto();
  isLoading = false;

  constructor(
    private emprestimoService: EmprestimoService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  mostrarMensagem() {
    this.snackBar.open('📘 Livro emprestado com sucesso!', 'Fechar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  LimitadorNumeros(event: Event) {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/[^0-9]/g, '');
    if (valor.length > 11) valor = valor.slice(0, 11);
    input.value = valor;
    this.emprestimo.celular = valor;
  }

  async emprestarLivro(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    try {
      this.isLoading = true;

      await this.emprestimoService.emprestarLivro(this.emprestimo);

      this.isLoading = false;
      this.mostrarMensagem();
      form.resetForm();

      this.router.navigate(['/']);
    } catch (error) {
      console.error('Erro ao emprestar livro:', error);
      this.isLoading = false;
      this.snackBar.open('❌ Erro ao emprestar livro!', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    }
  }
}
