import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesAddComponent, HeroesListComponent } from './containers';

const ROUTES: Routes = [
  { path: '', component: HeroesListComponent },
  { path: 'add', component: HeroesAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class HeroesRoutingModule {}
