import { Component, Input, inject, WritableSignal, signal } from '@angular/core';
import { CatDto } from '../../model/catDto';
import { ActivatedRoute, Router } from '@angular/router';
import { CatControllerService } from '../../api/catController.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cat-details',
  standalone: true,
  imports: [CommonModule, MatIconModule],
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
    throw new Error('Method not implemented.');
    }
  closeCat() {
    const $cat = this.catControllerService.removeCatById(this.catId).subscribe(_ => {
      $cat.unsubscribe();
      this.router.navigate(['/home'])
    })
  }
}
