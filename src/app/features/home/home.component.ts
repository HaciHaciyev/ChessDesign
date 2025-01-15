import {Component, HostListener, OnInit} from '@angular/core';
import {NavbarComponent} from '../shared/navbar/navbar.component';
import {ChessBoardComponent} from '../shared/chess-board/chess-board.component';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, ChessBoardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  protected chessBoardSize: number = 420;

  ngOnInit(): void {
    this.updateChessBoardSize();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.updateChessBoardSize();
  }

  private updateChessBoardSize(): void {
    const viewportWidth: number = window.innerWidth;
    const viewportHeight: number = window.innerHeight;

    this.chessBoardSize = Math.min(viewportWidth, viewportHeight) * 0.6;
  }
}
