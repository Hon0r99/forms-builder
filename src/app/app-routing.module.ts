import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router'

import { AuthGuard } from './components/auth/auth.guard';
import { SignupComponent } from './components/auth/signup/signup.component';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { LoginComponent } from './components/auth/login/login.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'formbuilder', component: FormBuilderComponent, canActivate: [AuthGuard]}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
