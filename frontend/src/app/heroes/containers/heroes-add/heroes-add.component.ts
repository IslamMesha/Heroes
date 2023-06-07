import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Hero } from 'src/app/shared/models/hero.model';
import { HeroesService } from '../../heroes.service';

@Component({
  selector: 'app-heroes-add',
  templateUrl: 'heroes-add.component.html',
})
export class HeroesAddComponent implements OnInit {
  private subs = new Subscription();
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private heroesService: HeroesService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      power: ['', Validators.required],
    });
  }

  onSubmit(formValue: Hero) {
    this.subs.add(
      this.heroesService.addHero(formValue).subscribe((res: Hero) => {
        if (res) {
          this.router.navigate(['/heroes']);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
