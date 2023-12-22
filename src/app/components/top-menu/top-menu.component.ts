import { Component, OnInit, inject, signal } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { TokenService } from '../../services/token.service';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [MatToolbarModule, CommonModule, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss'
})
export class TopMenuComponent implements OnInit{

 tokenService = inject(TokenService)
private router = inject(Router)
ngOnInit(): void {

  if(this.tokenService.getToken())
  {
    this.tokenService.isLogged.set(true)
  }
}
logout() {
  this.tokenService.isLogged.set(false)
  this.tokenService.removeToken()
  this.router.navigate([""])
}
}
