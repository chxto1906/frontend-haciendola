import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user';
import { ErrorService } from './error.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;
  public isAuth = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, 
    private _errorService: ErrorService,
    private router: Router) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/users'
    this.autoSignIn();
   }

   signIn(user: User): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user);
   }

   autoSignIn() {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('token')) {
          this.isAuth.next(true);
          //this.router.navigate(['/dashboard']);
      }
    }
}

   login(user: User): Observable<any> {
    const headers = new HttpHeaders(
      { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa('api-write:PgmHWYsVRr') // Aquí coloca tu usuario y contraseña en Base64 

      });
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}/login`, user, { headers: headers })
   }

   isLogged(): string {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token') ? localStorage.getItem('token') as string : "";
    }
    return ""; 
   }

   logOut() {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');  
      }
      this.router.navigate(['/login'])
    }
}