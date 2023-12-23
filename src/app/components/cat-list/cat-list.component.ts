import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { CatDto } from '../../model/catDto';
import { CatControllerService } from '../../api/catController.service';
import { Subscription } from 'rxjs';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-cat-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule],
  templateUrl: './cat-list.component.html',
  styleUrl: './cat-list.component.scss'
})
export class CatListComponent implements OnInit {
  cats : WritableSignal<Array<CatDto>> = signal([])
  private catControllerService = inject(CatControllerService)
  private $catControllerService : Subscription|null = null;
  private tokenService = inject(TokenService)
  ngOnInit(): void {
    const tokenData = this.tokenService.getDecodedToken();
    this.$catControllerService = this.catControllerService.getCatsByUsername(tokenData.sub as string).subscribe(
      data => {
        this.cats.set(data);
      }
    )
  }
  ngOnDestroy(){
    this.$catControllerService?.unsubscribe();
  }
  displayedColumns = [
    'name',
    'position',
    'weight',
    'symbol',
    'position',
    'weight',
    'symbol',
    'star',
  ];
  dataSource = ELEMENT_DATA;
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
