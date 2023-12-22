import { TestControllerService } from './../../api/testController.service';
import { JwtAuthenticationControllerService } from './../../api/jwtAuthenticationController.service';
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JwtRequest } from '../../model/jwtRequest';
import { TokenService } from '../../services/token.service';

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
      const $jwtAuthenticationControllerService = this.jwtAuthenticationControllerService.createAuthenticationToken(userDto).subscribe(data =>
        {
          if(data.token)
          {
          this.cookieService.setToken(data.token, 100)
          }
          $jwtAuthenticationControllerService.unsubscribe();
        })
    }
  }
}
