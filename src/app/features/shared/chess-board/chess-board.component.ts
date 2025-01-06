import {Component, ElementRef, input, InputSignal, OnInit, ViewChild} from '@angular/core';
import {Chessground} from 'chessground';
import {Api} from 'chessground/api';

@Component({
  selector: 'chess-board',
  imports: [],
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.scss']
})
export class ChessBoardComponent implements OnInit {
  @ViewChild('board', { static: true }) boardElement!: ElementRef;
  chessBoardSize: InputSignal<number> = input(280);
  isChessGameActive: InputSignal<boolean> = input(false);

  ngOnInit(): void {
    const board: Api = Chessground(this.boardElement.nativeElement!, {
      fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      orientation: "white"
    });
  }
}
