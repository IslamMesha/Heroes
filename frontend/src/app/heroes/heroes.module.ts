import { NgModule } from '@angular/core';

import { HeroesRoutingModule } from './heroes-routing.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { DirectivesModule } from '../directives/directives.module';
import { HeroesAddComponent, HeroesListComponent } from './containers';
import { HeroesFormComponent, HeroesListTableComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
    HeroesRoutingModule,
    ReactiveFormsModule,
    NgbRatingModule,
    NgbTypeaheadModule,
    DirectivesModule,
  ],
  declarations: [
    HeroesListComponent,
    HeroesAddComponent,
    HeroesListTableComponent,
    HeroesFormComponent,
  ],
})
export class HeroesModule {}
