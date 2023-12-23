import { Component, OnDestroy, OnInit, WritableSignal, inject, signal } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { CatDto } from '../../model/catDto';
import { CatControllerService } from '../../api/catController.service';
import { Subscription } from 'rxjs';
import { TokenService } from '../../services/token.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cat-list',
  standalone: true,
  imports: [RouterModule, MatTableModule, MatIconModule, CommonModule, MatButtonModule],
  templateUrl: './cat-list.component.html',
  styleUrl: './cat-list.component.scss'
})
export class CatListComponent implements OnInit, OnDestroy {
  cats : WritableSignal<Array<CatDto>> = signal([])
  private catControllerService = inject(CatControllerService)
  private $catControllerService : Subscription|null = null;
  private tokenService = inject(TokenService)
  username = signal("")
  ngOnInit(): void {
    const tokenData = this.tokenService.getDecodedToken();
    this.username.set(tokenData.sub as string)
    this.$catControllerService = this.catControllerService.getCatsByUsername(tokenData.sub as string).subscribe(
      data => {
        this.cats.set(data);
      }
    )
  }
  ngOnDestroy() : void{
    this.$catControllerService?.unsubscribe();
  }

  displayedColumns = [
    'catImageName',
    'name',
    'feedingLevel',
    'username',
    'star'
  ];

}

