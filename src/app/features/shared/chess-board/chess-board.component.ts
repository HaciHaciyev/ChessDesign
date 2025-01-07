import {AfterViewInit, Component, input, InputSignal} from '@angular/core';

@Component({
  selector: 'chess-board',
  imports: [],
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.scss']
})
export class ChessBoardComponent implements AfterViewInit {
  chessBoardSize: InputSignal<number> = input(280);
  isChessGameActive: InputSignal<boolean> = input(false);
  private chessBoard: any;

  ngAfterViewInit(): void {
    this.chessBoard = null; // TODO
  }
}
