import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatFormComponent } from '../../components/cat-form/cat-form.component';
@Component({
  selector: 'app-cat-creator',
  standalone: true,
  imports: [
    CommonModule,
    CatFormComponent
  ],
  templateUrl: './cat-creator.component.html',
  styleUrl: './cat-creator.component.scss'
})
export class CatCreatorComponent {

}
