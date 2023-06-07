import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
})
export class AppComponent {
  title = 'Heroes';

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title);
  }
}
