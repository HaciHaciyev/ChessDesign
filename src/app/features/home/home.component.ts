import {Component} from '@angular/core';
import {NavbarComponent} from '../shared/navbar/navbar.component';
import {ChessBoardComponent} from '../shared/chess-board/chess-board.component';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, ChessBoardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {}
