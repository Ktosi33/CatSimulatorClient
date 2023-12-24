import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { JwtAuthenticationControllerService } from '../../api/jwtAuthenticationController.service';
import { UserDto } from '../../model/userDto';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  registerForm: FormGroup;
  private jwtAuthenticationControllerService = inject(JwtAuthenticationControllerService)
  errorMessage = signal("")
  informationMessage = signal("")
  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid)  {

      const userDto : UserDto ={
        username: this.registerForm.value.username,
        password: this.registerForm.value.password
      }
      this.jwtAuthenticationControllerService.saveUser(userDto).subscribe(
        data => {
          this.registerForm.reset();
          this.errorMessage.set("")
          this.informationMessage.set("Utworzono użytkownika")
        },
        error => {
          this.errorMessage.set(error.error.error);
          this.informationMessage.set("")
          this.registerForm.reset();
        }
      );
    }
  }
}
