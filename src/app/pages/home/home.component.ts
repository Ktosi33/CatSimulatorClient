import { Component } from '@angular/core';
import { CatListComponent } from '../../components/cat-list/cat-list.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CatListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
