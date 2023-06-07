import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {removeLocalStorageItem} from 'src/app/shared/storage.util';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subs = new Subscription();
  isLoggedUser = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.isLoggedUser = this.authService.isLoggedUser();
  }

  logout(): void {
    removeLocalStorageItem('authToken');
    removeLocalStorageItem('user');
    this.router.navigate(['auth/login']);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
