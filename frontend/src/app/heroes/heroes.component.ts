import {Component, OnInit, PipeTransform, QueryList, ViewChildren} from '@angular/core';
import {map, Observable, startWith} from "rxjs";
import {HeroesService} from "../heroes.service";
import {SortEvent, SortableDirective} from "../sortable.directive";
import {FormControl} from "@angular/forms";
import {DecimalPipe} from "@angular/common";
import {NgbRatingConfig} from "@ng-bootstrap/ng-bootstrap";

export interface Hero {
  id: number;
  name: string;
  power: string;
  rate: number;
}

const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  constructor(
    private heroesService: HeroesService, private pipe: DecimalPipe, private config: NgbRatingConfig
  ) {
    config.max = 5;
    this.filter.valueChanges.pipe(
      startWith(''),
      map((text) => this.search(text, pipe)),
    ).subscribe((data) => {
    });
  }

  @ViewChildren(SortableDirective) headers!: QueryList<SortableDirective>;

  heroes!: Hero[];
  total!: Observable<number>;
  rate = new FormControl(0, {nonNullable: true});
  filter = new FormControl('', {nonNullable: true});


  ngOnInit() {
    this.heroesService.getHeroes().subscribe((data) => {
      this.total = data.count;
      this.heroes = data.results;
    });
  }

  onSort({column, direction}: SortEvent) {
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // Sorting heroes
    let heroes = this.heroes;
    if (direction === '' || column === '') {
    } else {
      this.heroes = [...heroes].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  search(text: string, pipe: PipeTransform) {
    this.heroesService.getHeroes(text).subscribe((data) => {
      this.total = data.count;
      this.heroes = data.results;
    });
  }

  onRateChange(id: number, event: any) {
    debugger;
    // this.heroesService.submitRate(id, rate).subscribe((data) => {
    //   this.heroesService.getHeroes().subscribe((data) => {
    //     this.total = data.count;
    //     this.heroes = data.results;
    //   });
    // });
  }
}
