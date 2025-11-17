import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginUserDto } from '../model/LoginUserDto';
import { RecoveryJwtTokenDto } from '../model/RecoveryJwtTokenDto';

interface User {
  email: string;
  role: 'admin';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private url = 'https://projeto-galpaocultural-back.onrender.com/auth/login'

  constructor(private http: HttpClient) {}

   async login(Login: LoginUserDto): Promise<RecoveryJwtTokenDto> {
    return await firstValueFrom(this.http.post<RecoveryJwtTokenDto>(this.url, Login));
   }
}
//   private loggedInSubject = new BehaviorSubject<boolean>(false);
//   private currentUserSubject = new BehaviorSubject<User | null>(null);

//   isLoggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();
//   currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

//   login(email: string, senha: string): boolean {
//     if (email === 'admin@galpao.com' && senha === '123456') {
//       const user: User = { email: email, role: 'admin' };
      
//       this.loggedInSubject.next(true);
//       this.currentUserSubject.next(user);

//       console.log('Login successful for:', email);
//       return true;
//     } else {
//       console.log('Login failed: Invalid credentials.');
//       return false;
//     }
//   }