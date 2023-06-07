import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Hero } from '../../../shared/models/hero.model';

@Component({
  selector: 'app-heroes-form',
  templateUrl: 'heroes-form.component.html',
})
export class HeroesFormComponent {
  @Input() formGroup!: FormGroup;
  @Output() formSubmitted: EventEmitter<Hero> = new EventEmitter<Hero>();

  get name(): FormControl {
    return this.formGroup.get('name') as FormControl;
  }

  get power(): FormControl {
    return this.formGroup.get('power') as FormControl;
  }

  onSubmit(): void {
    if (!this.formGroup.valid) return;

    this.formSubmitted.next(this.formGroup.getRawValue());
  }
}
