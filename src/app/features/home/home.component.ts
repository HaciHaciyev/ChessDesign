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

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.updateChessBoardSize();
  }

  private updateChessBoardSize(): void {
    const zoomLevel: number = window.innerWidth / window.outerWidth;

    const scaledWidth: number = window.innerWidth / zoomLevel;
    const scaledHeight: number = window.innerHeight / zoomLevel;

    const sizeBasedOnWidth: number = Math.min(scaledWidth * 0.4, 600);
    const sizeBasedOnHeight: number = Math.min(scaledHeight * 0.5, 600);

    this.chessBoardSize = Math.min(sizeBasedOnWidth, sizeBasedOnHeight + 40);
  }
}
