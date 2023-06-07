import {Inject, Injectable, PipeTransform} from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SortColumn} from "./sortable.directive";
import {Hero} from "./heroes/heroes.component";


const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

function sort(countries: Hero[], column: SortColumn, direction: string): Hero[] {
  if (direction === '' || column === '') {
    return countries;
  } else {
    return [...countries].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(hero: Hero, term: string, pipe: PipeTransform) {
  return (
    hero.name.toLowerCase().includes(term.toLowerCase()) ||
    pipe.transform(hero.name).includes(term) ||
    pipe.transform(hero.power).includes(term)
  );
}

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {
  }

  getHeroes(term: string = ''): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/heroes/?search=${term}`)
      .pipe(
        catchError(error => {
          console.error('Failed to load heroes:', error);
          return of({heroes: []});
        })
      );
  }
}
