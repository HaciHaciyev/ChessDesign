import {Component, Input} from '@angular/core';
import {Color, PieceType} from '../chess-types';
import {NgClass, NgIf} from '@angular/common';
import {StorageService} from '../../service/StorageService';

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

  constructor(private storage: StorageService) {}

  get imagePath(): string {
    return `assets/piece/${this.storage.getPieces()}/${this.color}${this.pieceType}.svg`;
  }

  protected readonly Color: typeof Color = Color;
}
