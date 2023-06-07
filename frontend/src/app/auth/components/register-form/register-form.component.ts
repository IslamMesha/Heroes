import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: 'register-form.component.html',
})
export class RegisterFormComponent {
  @Input() formGroup!: FormGroup;
  @Output() formSubmitted: EventEmitter<Record<string, unknown>> = new EventEmitter<Record<string, unknown>>();

  get username(): FormControl {
    return this.formGroup.get('username') as FormControl;
  }

  get email(): FormControl {
    return this.formGroup.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.formGroup.get('password') as FormControl;
  }

  onSubmit(): void {
    if (!this.formGroup.valid) return;

    this.formSubmitted.next(this.formGroup.getRawValue());
  }
}
