import { CommonModule } from '@angular/common';
import { Component, WritableSignal, inject, signal } from '@angular/core';
import { CatFormComponent } from '../../components/cat-form/cat-form.component';
import { ActivatedRoute } from '@angular/router';
import { CatControllerService } from '../../api/catController.service';
import { CatDto } from '../../model/catDto';

@Component({
  selector: 'app-cat-editor',
  standalone: true,
  imports: [CommonModule,
    CatFormComponent],
  templateUrl: './cat-editor.component.html',
  styleUrl: './cat-editor.component.scss'
})
export class CatEditorComponent {
  cat : WritableSignal<CatDto|null> = signal(null)
  catId : number = null!
 private activatedRoute = inject(ActivatedRoute)
 private catControllerService = inject(CatControllerService)
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
}
