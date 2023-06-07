import { Inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Hero, HeroConfig } from '../shared/models/hero.model';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {}

  getHeroes(term: string = ''): Observable<HeroConfig> {
    return this.http
      .get<HeroConfig>(`${this.baseUrl}/api/heroes/?search=${term}`)
      .pipe(
        catchError((error) => {
          console.error('Failed to load heroes:', error);
          return of({
            count: 0,
            next: undefined,
            previous: undefined,
            results: [],
          } as HeroConfig);
        })
      );
  }

  submitRate(data: Hero): Observable<boolean> {
    // Add auth token to the request headers
    const headers = new HttpHeaders({
      Authorization: `JWT ${localStorage.getItem("authToken")!.replace(/['"]+/g, '')}`
    });
    return this.http
      .post<boolean>(`${this.baseUrl}/api/rates/`, {"hero": data.id, "rate": data.rate}, {headers: headers})
      .pipe(
        catchError((error) => {
          console.error('Failed to load heroes:', error);
          return of(false);
        })
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.baseUrl}/api/heroes/`, hero).pipe(
      catchError((error) => {
        console.error('Failed to load heroes:', error);
        return of();
      })
    );
  }
}
