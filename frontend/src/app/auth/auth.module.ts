import { NgModule } from '@angular/core';

import { LoginComponent, RegisterComponent } from './containers';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent, RegisterFormComponent } from './components';

@NgModule({
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule],
  declarations: [LoginComponent, RegisterComponent, LoginFormComponent, RegisterFormComponent],
})
export class AuthModule {}
