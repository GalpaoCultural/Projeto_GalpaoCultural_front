import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmprestimoService } from '../../service/emprestimo-service';
import { VisualizarEmpDTO } from '../../model/VisualizarEmpDTO';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-devolucoes',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './devolucoes.html',
  styleUrls: ['./devolucoes.css']
})
export class Devolucoes {
  celular!: string;
  emprestimos: VisualizarEmpDTO[] = [];
  isLoading = false;
  erroMsg: string | null = null;
  buscaRealizada = false;

  constructor(private emprestimoService: EmprestimoService, private cdr: ChangeDetectorRef, private zone: NgZone, private snackBar: MatSnackBar) { }

  mostrarMensagem() {
    this.snackBar.open('Livro devolvido com sucesso ✅', 'Fechar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  //MOSTRAR TODOS OS EMPRESTIMOS POR CELULAR
  async verEmprestimos() {
    if (!this.celular.trim()) {
      this.erroMsg = 'Digite um número de celular válido.';
      this.emprestimos = [];
      this.buscaRealizada = false;
      return;
    }
    this.erroMsg = null;
    this.isLoading = true;
    this.buscaRealizada = true;

    const dados = await this.emprestimoService.verEmprestimos(this.celular);

    this.zone.run(() => {
      this.emprestimos = dados;
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  async devolverLivro(id: number) {
    await this.emprestimoService.devolverLivro(id);
    await this.verEmprestimos();

    this.mostrarMensagem();
  }
}

