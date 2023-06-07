import { Inject, Injectable } from '@angular/core';
import { User } from '../shared/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getLocalStorageItem } from '../shared/storage.util';
import { AuthData, Hero } from '../shared/models/hero.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {}

  isLoggedUser(): boolean {
    return !!getLocalStorageItem('authToken');
  }

  getUserData(): Hero {
    return getLocalStorageItem('user') as Hero;
  }

  login(payload: User): Observable<AuthData> {
    return this.http.post<AuthData>(`${this.baseUrl}/api/token/`, payload);
  }

  register(payload: User): Observable<AuthData> {
    return this.http.post<AuthData>(`${this.baseUrl}/api/heroes/`, payload);
  }

  logout(): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/api/logout/`, {});
  }
}
