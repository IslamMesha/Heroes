import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BASE_URL} from "./constants";
import {RouterOutlet} from "@angular/router";
import {LoginComponent} from './login/login.component';
import {HeroesComponent} from './heroes/heroes.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import {SortableDirective} from "./sortable.directive";
import {DecimalPipe} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeroesComponent,
    SortableDirective,
  ],
  imports: [
    NgbModule,
    FormsModule,
    RouterOutlet,
    DecimalPipe,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [{provide: 'BASE_URL', useValue: BASE_URL}, DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
