import { TokenService } from '../../services/token.service';
import { TestControllerService } from './../../api/testController.service';
import { AfterViewInit, Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [],
  templateUrl: './hello.component.html',
  styleUrl: './hello.component.scss'
})
export class HelloComponent implements OnInit, AfterViewInit {

  private tokenService = inject(TokenService)
  helloText = ""
  private testControllerService = inject(TestControllerService)
  ngOnInit(): void {

  }
  ngAfterViewInit(){
    const $sub = this.testControllerService.welcomePage().subscribe(data =>
      {
        console.log(this.helloText)
        this.helloText = data
        $sub.unsubscribe();
      })
  }
}
