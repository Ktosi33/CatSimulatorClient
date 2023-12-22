import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [LoginFormComponent, RegisterFormComponent, CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  activeTab: 'register' | 'login' = 'login';
  setActiveTab(tab: 'register' | 'login'): void {
    this.activeTab = tab;
  }
}

