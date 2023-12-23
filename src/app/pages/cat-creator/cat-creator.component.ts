import { Component, inject, signal } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CatDto } from '../../model/catDto';
import { CommonModule } from '@angular/common';
import {MatRadioModule} from '@angular/material/radio';
import { TokenService } from '../../services/token.service';
import { CatControllerService } from '../../api/catController.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cat-creator',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule
  ],
  templateUrl: './cat-creator.component.html',
  styleUrl: './cat-creator.component.scss'
})
export class CatCreatorComponent {
  catForm: FormGroup;
  catImages = ["1.png", "2.png", "3.png", "4.png", "5.png"]

  private tokenService = inject(TokenService)
  private catControllerService = inject(CatControllerService)
  $addCat : Subscription = null!;
  errorMessage = signal("")
  private router = inject(Router)
  constructor(private fb: FormBuilder) {
    this.catForm = this.fb.group({
      name: ['', Validators.required],
      catImageName: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.catForm.valid) {
      const catDto: CatDto = this.catForm.value;
      console.log(catDto);
      const token = this.tokenService.getDecodedToken();
      catDto.username = token.sub

      this.$addCat = this.catControllerService.addCat(catDto).subscribe(
        (response) => {
          this.catForm.reset();
          this.router.navigate(['home'])
        },
        (error) => {
          this.errorMessage.set("Coś poszło nie tak")
        }
      );


    }
}

  ngOnDestroy(){
    this.$addCat?.unsubscribe();
  }
}
