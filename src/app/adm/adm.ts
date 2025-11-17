import { Component } from '@angular/core';
import { FormGroup, 
  ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginUserDto } from '../model/LoginUserDto';
import { AuthService } from '../service/auth-service';

@Component({
  selector: 'app-adm',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './adm.html',
  styleUrl: './adm.css'
})
export class Adm {
  loginForm!: FormGroup;
  usuario: LoginUserDto = new LoginUserDto

  constructor(private authService: AuthService) {}

  Login(): void {

  }
} 