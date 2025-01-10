import {Component, Input} from '@angular/core';
import {Color, PieceType} from '../chess-types';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-piece',
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: './piece.component.html',
  styleUrl: './piece.component.scss'
})
export class PieceComponent {
  @Input() pieceType!: PieceType;
  @Input() color!: Color;

  get imagePath(): string {
    const imagePath = `assets/piece/maestro/${this.color}${this.pieceType}.svg`;
    console.log(imagePath);
    return imagePath;
  }

  protected readonly Color: typeof Color = Color;
}
