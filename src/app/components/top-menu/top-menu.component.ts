import { Component, OnInit, inject, signal } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { TokenService } from '../../services/token.service';
@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss'
})
export class TopMenuComponent implements OnInit{
private tokenService = inject(TokenService)
isLogged = signal(false)
ngOnInit(): void {
  const token = this.tokenService.getToken()
  if(token)
  {
    this.isLogged.set(true);
  }
}
}
