import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { CatControllerService } from '../../api/catController.service';
import { CatImageControllerService } from '../../api/catImageController.service';
import { CatDto } from '../../model/catDto';
import { CatImageDto } from '../../model/catImageDto';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cat-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule],
  templateUrl: './cat-form.component.html',
  styleUrl: './cat-form.component.scss'
})
export class CatFormComponent implements OnInit{
  @Input() initData : CatDto | null = null

  catForm: FormGroup = null!;
  catImage : WritableSignal<Array<CatImageDto>> = signal([])
  private tokenService = inject(TokenService)
  private catControllerService = inject(CatControllerService)
  private catImageControllerService = inject(CatImageControllerService)
  $addCat : Subscription = null!;
  $editCat : Subscription = null!;
  errorMessage = signal("")
  afterSubmit = signal(false);
  private router = inject(Router)
  private fb = inject(FormBuilder)

  ngOnInit(): void {
    this.catImageControllerService.getImages().subscribe(data => {
      this.catImage.set(data);
    })
    console.log(this.initData)
    if(this.initData)
    {
      this.catForm = this.fb.group({
        name: [this.initData.name, Validators.required],
        catImageName: [this.initData.catImageName, Validators.required]
      });
    }else{
    this.catForm = this.fb.group({
      name: ['', Validators.required],
      catImageName: ['', Validators.required]
    });
  }
  }

  onSubmit() {
    this.afterSubmit.set(true)
    if (this.catForm.valid) {
      const catDto: CatDto = this.catForm.value;
      const token = this.tokenService.getDecodedToken();
      catDto.username = token.sub
      if(this.initData !== null)
      {
        catDto.feedingLevel = this.initData.feedingLevel;
      this.$editCat = this.catControllerService.updateCatById(this.initData.catId!, catDto).subscribe(
        (response) => {
          this.catForm.reset();
          this.errorMessage.set("")
          this.router.navigate(['cat', this.initData!.catId!])
        },
        (error) => {
          this.errorMessage.set(error.error.error)
        }
      );
      }
     else{
      this.$addCat = this.catControllerService.addCat(catDto).subscribe(
        (response) => {
          this.catForm.reset();
          this.errorMessage.set("")
          this.router.navigate(['home'])
        },
        (error) => {
          this.errorMessage.set(error.error.error)
        }
      );
    }
  }
}

  ngOnDestroy(){
    this.$addCat?.unsubscribe();
    this.$editCat?.unsubscribe()
  }
}
