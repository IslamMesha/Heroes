import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { Hero } from '../../../shared/models/hero.model';
import {
  SortEvent,
  SortableDirective,
} from '../../../directives/sortable/sortable.directive';
import { FormControl } from '@angular/forms';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

const compare = (v1: string | number, v2: string | number) =>
  v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

@Component({
  selector: 'app-heroes-list-table',
  templateUrl: 'heroes-list-table.component.html',
})
export class HeroesListTableComponent {
  @Input() heroes: Hero[] = [];
  @Input() filter!: FormControl;
  @Output() onRateChanged = new EventEmitter<Hero>();
  @ViewChildren(SortableDirective) headers!: QueryList<SortableDirective>;

  constructor(private config: NgbRatingConfig) {
    this.config.max = 5;
  }

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // Sorting heroes
    let heroes = this.heroes;
    if (direction && column) {
      this.heroes = [...heroes].sort((a, b) => {
        const res = compare(
          <string | number>a[column],
          <string | number>b[column]
        );
        return direction === 'asc' ? res : -res;
      });
    }
  }

  onRateChange(id: number, rate: number) {
    this.onRateChanged.emit({id, rate});
  }
}
