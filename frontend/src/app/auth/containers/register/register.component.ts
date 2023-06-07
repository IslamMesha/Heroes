import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { setLocalStorageItem } from '../../../shared/storage.util';
import { Subscription } from 'rxjs';
import { AuthData } from '../../../shared/models/hero.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [],
})
export class RegisterComponent implements OnInit, OnDestroy {
  private subs = new Subscription();
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(formValue: Record<string, unknown>) {
    this.subs.add(
      this.authService.register(formValue).subscribe((res: AuthData) => {
        if (res['access']) {
          setLocalStorageItem('authToken', res['access']);
          setLocalStorageItem('user', res['hero']);
          this.router.navigate(['/heroes']);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
