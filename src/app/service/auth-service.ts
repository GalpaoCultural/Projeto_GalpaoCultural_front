import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginUserDto } from '../model/LoginUserDto';
import { RecoveryJwtTokenDto } from '../model/RecoveryJwtTokenDto';
import { Router } from '@angular/router';
import { createUserDto } from '../model/createUserDto';


interface User {
  email: string;
  role: 'admin';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logar = 'https://projeto-galpaocultural-back.onrender.com/auth/login'
  private cadastrar = 'https://projeto-galpaocultural-back.onrender.com/auth/criar'

  private readonly AUTH_KEY = 'admin_authenticated';

  constructor(private router: Router, private http: HttpClient) { }

  async login(Login: LoginUserDto): Promise<RecoveryJwtTokenDto> {
    return await firstValueFrom(this.http.post<RecoveryJwtTokenDto>(this.logar, Login));
  }

  async cadastro(CreateUser: createUserDto): Promise<void> {
    return await firstValueFrom(this.http.post<void>(this.cadastrar, CreateUser));
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.AUTH_KEY) === 'true';
  }

}