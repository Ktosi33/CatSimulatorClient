import { Component, Input, inject, WritableSignal, signal } from '@angular/core';
import { CatDto } from '../../model/catDto';
import { ActivatedRoute } from '@angular/router';
import { CatControllerService } from '../../api/catController.service';

@Component({
  selector: 'app-cat-details',
  standalone: true,
  imports: [],
  templateUrl: './cat-details.component.html',
  styleUrl: './cat-details.component.scss'
})
export class CatDetailsComponent {
   cat : WritableSignal<CatDto|null> = signal(null)
  private activatedRoute = inject(ActivatedRoute)
  private catControllerService = inject(CatControllerService)
  ngOnInit() {
    const $params = this.activatedRoute.params.subscribe(params => {
      const catId = params['id'];
     const $cat = this.catControllerService.getCatById(catId).subscribe(data => {
        this.cat.set(data);
        $params.unsubscribe();
        $cat.unsubscribe();
      })
    });
  }
  feedCat() {
    // Obsługa karmienia kota - możesz dodać odpowiednie logiki obsługi tutaj
    console.log('Karmienie kota:', this.cat?.name);
  }
}
