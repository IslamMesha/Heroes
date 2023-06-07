import { Component, OnDestroy, OnInit, PipeTransform } from '@angular/core';
import { Hero } from '../../../shared/models/hero.model';
import { HeroesService } from '../../heroes.service';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: 'heroes-list.component.html',
})
export class HeroesListComponent implements OnInit, OnDestroy {
  private subs = new Subscription();
  filter = new FormControl('', { nonNullable: true });
  total: number = 0;
  heroes!: Hero[];
  userData!: Hero;

  constructor(
    private heroesService: HeroesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userData = this.authService.getUserData();
    this.subs.add(this.getHeroes());
    this.subs.add(this.listenToTableSearch());
  }

  rateChanged(hero: Hero) {
    this.subs.add(
      this.heroesService.submitRate(hero).subscribe(() => {
        this.getHeroes();
      })
    );
  }

  private getHeroes(term?: string): Subscription {
    return this.heroesService.getHeroes(term).subscribe((data) => {
      this.total = data.count;
      this.heroes = data.results;
    });
  }

  private listenToTableSearch(): Subscription {
    return this.filter.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(500))
      .subscribe((text) => {
        this.search(text);
      });
  }

  private search(text: string) {
    this.getHeroes(text.toLowerCase());
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
