import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService { 
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: { email: string; password: string }): Observable<{ token: string; user: { name: string; role: string } }> {
    return this.http.post<{ token: string; user: { name: string; role: string } }>(`${this.apiUrl}/login`, credentials);
  }
}
