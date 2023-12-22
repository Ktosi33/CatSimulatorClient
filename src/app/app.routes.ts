import { Routes } from '@angular/router';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HelloComponent } from './components/hello/hello.component';
import { HomeComponent } from './pages/home/home.component';
import { AccountComponent } from './pages/account/account.component';


export const routes: Routes = [
  {
    path:'',
    component: AccountComponent
  },
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'hello',
    component: HelloComponent
  }
];
