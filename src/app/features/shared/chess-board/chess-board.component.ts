import {Component, input, InputSignal, OnInit} from '@angular/core';
import {Color, Coordinate, CoordinateUtils, DEFAULT_FEN, PieceType} from './chess-types';
import {NgForOf} from '@angular/common';
import {FieldComponent, OptionalPiece} from './field/field.component';

@Component({
  selector: 'chess-board',
  imports: [
    NgForOf,
    FieldComponent
  ],
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.scss']
})
export class ChessBoardComponent implements OnInit {
  fen: InputSignal<string> = input(DEFAULT_FEN);
  chessBoardSize: InputSignal<number> = input(280);
  isChessGameActive: InputSignal<boolean> = input(false);

  protected coordinates: Coordinate[] = [];
  protected readonly fieldMap: Map<Coordinate, OptionalPiece> = new Map();

  ngOnInit(): void {
    this.initializeChessBoard(this.fen());
  }

  private initializeChessBoard(fen: string): void {
    this.coordinates = CoordinateUtils.values();

    if (this.fen() === DEFAULT_FEN) {
      this.fieldMap.set(Coordinate.a1, { type: PieceType.Rook, color: Color.White });
      this.fieldMap.set(Coordinate.b1, { type: PieceType.Knight, color: Color.White });
      this.fieldMap.set(Coordinate.c1, { type: PieceType.Bishop, color: Color.White });
      this.fieldMap.set(Coordinate.d1, { type: PieceType.Queen, color: Color.White });
      this.fieldMap.set(Coordinate.e1, { type: PieceType.King, color: Color.White });
      this.fieldMap.set(Coordinate.f1, { type: PieceType.Bishop, color: Color.White });
      this.fieldMap.set(Coordinate.g1, { type: PieceType.Knight, color: Color.White });
      this.fieldMap.set(Coordinate.h1, { type: PieceType.Rook, color: Color.White });

      this.fieldMap.set(Coordinate.a2, { type: PieceType.Pawn, color: Color.White });
      this.fieldMap.set(Coordinate.b2, { type: PieceType.Pawn, color: Color.White });
      this.fieldMap.set(Coordinate.c2, { type: PieceType.Pawn, color: Color.White });
      this.fieldMap.set(Coordinate.d2, { type: PieceType.Pawn, color: Color.White });
      this.fieldMap.set(Coordinate.e2, { type: PieceType.Pawn, color: Color.White });
      this.fieldMap.set(Coordinate.f2, { type: PieceType.Pawn, color: Color.White });
      this.fieldMap.set(Coordinate.g2, { type: PieceType.Pawn, color: Color.White });
      this.fieldMap.set(Coordinate.h2, { type: PieceType.Pawn, color: Color.White });

      this.fieldMap.set(Coordinate.a8, { type: PieceType.Rook, color: Color.Black });
      this.fieldMap.set(Coordinate.b8, { type: PieceType.Knight, color: Color.Black });
      this.fieldMap.set(Coordinate.c8, { type: PieceType.Bishop, color: Color.Black });
      this.fieldMap.set(Coordinate.d8, { type: PieceType.Queen, color: Color.Black });
      this.fieldMap.set(Coordinate.e8, { type: PieceType.King, color: Color.Black });
      this.fieldMap.set(Coordinate.f8, { type: PieceType.Bishop, color: Color.Black });
      this.fieldMap.set(Coordinate.g8, { type: PieceType.Knight, color: Color.Black });
      this.fieldMap.set(Coordinate.h8, { type: PieceType.Rook, color: Color.Black });

      this.fieldMap.set(Coordinate.a7, { type: PieceType.Pawn, color: Color.Black });
      this.fieldMap.set(Coordinate.b7, { type: PieceType.Pawn, color: Color.Black });
      this.fieldMap.set(Coordinate.c7, { type: PieceType.Pawn, color: Color.Black });
      this.fieldMap.set(Coordinate.d7, { type: PieceType.Pawn, color: Color.Black });
      this.fieldMap.set(Coordinate.e7, { type: PieceType.Pawn, color: Color.Black });
      this.fieldMap.set(Coordinate.f7, { type: PieceType.Pawn, color: Color.Black });
      this.fieldMap.set(Coordinate.g7, { type: PieceType.Pawn, color: Color.Black });
      this.fieldMap.set(Coordinate.h7, { type: PieceType.Pawn, color: Color.Black });

      for (const coordinate of this.coordinates) {
        const row: number = CoordinateUtils.row(coordinate);
        if (row === 1 || row === 2 || row === 7 || row === 8) {
          continue;
        }

        this.fieldMap.set(coordinate, null);
      }
    }
  }
}
