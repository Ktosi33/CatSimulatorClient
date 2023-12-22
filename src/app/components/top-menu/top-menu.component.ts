import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss'
})
export class TopMenuComponent {

}
