import { Routes } from '@angular/router';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HelloComponent } from './components/hello/hello.component';


export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'register'
  },
  {
    path:'register',
    component: RegisterFormComponent
  },
  {
    path:'login',
    component: LoginFormComponent
  },
  {
    path:'hello',
    component: HelloComponent
  }
];
