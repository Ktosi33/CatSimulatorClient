import { TestControllerService } from './../../api/testController.service';
import { JwtAuthenticationControllerService } from './../../api/jwtAuthenticationController.service';
import { Component, Inject, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JwtRequest } from '../../model/jwtRequest';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  loginForm: FormGroup;
  private jwtAuthenticationControllerService= inject(JwtAuthenticationControllerService)
  private cookieService = inject(TokenService)
  private tokenKey = 'access_token';
  private router = inject(Router)
  errorMessage = signal("")
  constructor(@Inject(FormBuilder) private  formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  onSubmit() {
    if (this.loginForm.valid) {

      const userDto : JwtRequest ={
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      }
      this.jwtAuthenticationControllerService.createAuthenticationToken(userDto).pipe(
        take(1)
      ).subscribe(
        data => {
          if (data && data.token) {
            this.cookieService.setToken(data.token, 100);
            this.errorMessage.set("")
            this.router.navigate(['home']);
          } else {
            this.errorMessage.set("Logowanie nie powiodło się");
            this.loginForm.reset();
          }
        },
        error => {
          if (error.status === 401) {
            this.errorMessage.set("Nieprawidłowy login lub hasło");
          } else {
            this.errorMessage.set(error.error.error);
          }
          this.loginForm.reset();
        }
      );
    }
  }
}
