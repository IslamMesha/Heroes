import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';
import { BASE_URL } from './shared/constants';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [NgbModule, BrowserModule, HttpClientModule, AppRoutingModule, CoreModule],
  providers: [{ provide: 'BASE_URL', useValue: BASE_URL }, DecimalPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
