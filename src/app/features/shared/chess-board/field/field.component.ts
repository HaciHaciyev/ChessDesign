import {Component, Input} from '@angular/core';
import {Coordinate, IPiece} from '../chess-types';
import {PieceComponent} from '../piece/piece.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-field',
  imports: [
    PieceComponent,
    NgIf
  ],
  templateUrl: './field.component.html',
  styleUrl: './field.component.scss'
})
export class FieldComponent {
  @Input() coordinate!: Coordinate;
  @Input() piece!: OptionalPiece;

  get isBlack(): boolean {
    const row: number = parseInt(this.coordinate.charAt(1), 10);
    const column: number = this.coordinate.charCodeAt(0);
    return (column + row) % 2 === 0;
  }

  get optionalPiece(): OptionalPiece {
    return this.piece;
  }
}

export type OptionalPiece = IPiece | null;
