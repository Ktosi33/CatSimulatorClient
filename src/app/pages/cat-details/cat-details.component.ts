import { Component, Input, inject, WritableSignal, signal } from '@angular/core';
import { CatDto } from '../../model/catDto';
import { ActivatedRoute, Router } from '@angular/router';
import { CatControllerService } from '../../api/catController.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cat-details',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './cat-details.component.html',
  styleUrl: './cat-details.component.scss'
})
export class CatDetailsComponent {

   cat : WritableSignal<CatDto|null> = signal(null)
   catId : number = null!
  private activatedRoute = inject(ActivatedRoute)
  private catControllerService = inject(CatControllerService)
  private router = inject(Router)
  ngOnInit() {
    const $params = this.activatedRoute.params.subscribe(params => {
     this.catId = params['id'];
     const $cat = this.catControllerService.getCatById(this.catId).subscribe(data => {
        this.cat.set(data);
        $params.unsubscribe();
        $cat.unsubscribe();
      })
    });
  }
  feedCat() {

    const catDto = this.cat()!
    catDto.feedingLevel!++;
    this.cat.set(catDto)
    const $cat = this.catControllerService.updateCatById(this.catId, catDto).subscribe(_ => {
      $cat.unsubscribe();
    })
  }
  editCat() {
    this.router.navigate(['/cat', 'edit', this.catId])
    }
  closeCat() {
    const $cat = this.catControllerService.removeCatById(this.catId).subscribe(_ => {
      $cat.unsubscribe();
      this.router.navigate(['/home'])
    })
  }
}
