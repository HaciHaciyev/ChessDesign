import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(localStorage.getItem(StorageType.JWT_TOKEN));
  private selectedPieces: Pieces = Pieces.Piece_Leipzig;
  private selectedBoard: Board = Board.Board_Wood4;

  constructor() {}

  set(key: StorageType, value: string): void {
    localStorage.setItem(key, value);
    this.tokenSubject.next(value);
  }

  get<T>(key: StorageType): string | null {
    return localStorage.getItem(key);
  }

  remove(key: StorageType): void {
    localStorage.removeItem(key);
    this.tokenSubject.next(null);
  }

  getTokenObservable(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  getBoard(): string {
    return this.selectedBoard;
  }

  setBoard(key: Board): void {
    this.selectedBoard = key;
  }

  removeBoard(): void {
    this.selectedBoard = Board.Board_Wood4;
  }

  getPieces(): string {
    return this.selectedPieces;
  }

  setPieces(key: Pieces): void {
    this.selectedPieces = key;
  }

  removePieces(): void {
    this.selectedPieces = Pieces.Piece_Leipzig;
  }
}

export enum StorageType {
  JWT_TOKEN = 'JWTToken',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}

export enum Board {
  Board_Blue = 'blue.png',
  Board_Blue_Marble = 'blue-marble.jpg',
  Board_Blue_Marble_Orig = 'blue-marble.orig.jpg',
  Board_Blue2 = 'blue2.jpg',
  Board_Blue3 = 'blue3.jpg',
  Board_Brown = 'brown.png',
  Board_Canvas2 = 'canvas2.jpg',
  Board_Canvas2_Orig = 'canvas2.orig.jpg',
  Board_Green = 'green.png',
  Board_Green_Plastic = 'green-plastic.png',
  Board_Grey = 'grey.jpg',
  Board_Horse_Current_Premove = 'horse.current-premove.png',
  Board_Horse = 'horse.jpg',
  Board_Horse_Last_Move = 'horse.last-move.png',
  Board_Horse_Move_Dest = 'horse.move-dest.png',
  Board_Horse_Selected = 'horse.selected.png',
  Board_Leather = 'leather.jpg',
  Board_Leather_Orig = 'leather.orig.jpg',
  Board_Maple = 'maple.jpg',
  Board_Maple2 = 'maple2.jpg',
  Board_Maple2_Orig = 'maple2.orig.jpg',
  Board_Marble = 'marble.jpg',
  Board_Metal = 'metal.jpg',
  Board_Metal_Orig = 'metal.orig.jpg',
  Board_Ncf_Board = 'ncf-board.png',
  Board_Olive = 'olive.png',
  Board_Pink_Pyramid = 'pink-pyramid.png',
  Board_Purple = 'purple.png',
  Board_Purple_Diag = 'purple-diag.png',
  Board_Wood = 'wood.jpg',
  Board_Wood2 = 'wood2.jpg',
  Board_Wood3 = 'wood3.jpg',
  Board_Wood3_Orig = 'wood3.orig.jpg',
  Board_Wood4 = 'wood4.jpg',
  Board_Wood4_Orig = 'wood4.orig.jpg'
}

export enum BoardThumbnail {
  Board_Blue = 'blue.thumbnail.jpg',
  Board_Blue_Marble = 'blue-marble.thumbnail.jpg',
  Board_Blue2 = 'blue2.thumbnail.jpg',
  Board_Blue3 = 'blue3.thumbnail.jpg',
  Board_Brown = 'brown.thumbnail.jpg',
  Board_Canvas2 = 'canvas2.thumbnail.jpg',
  Board_Green = 'green.thumbnail.jpg',
  Board_Green_Plastic = 'green-plastic.thumbnail.png',
  Board_Grey = 'grey.thumbnail.jpg',
  Board_Horse = 'horse.thumbnail.jpg',
  Board_Ic = 'ic.thumbnail.png',
  Board_Leather = 'leather.thumbnail.jpg',
  Board_Maple = 'maple.thumbnail.jpg',
  Board_Maple2 = 'maple2.thumbnail.jpg',
  Board_Marble = 'marble.thumbnail.jpg',
  Board_Metal = 'metal.thumbnail.jpg',
  Board_Olive = 'olive.thumbnail.jpg',
  Board_Pink_Pyramid = 'pink-pyramid.thumbnail.png',
  Board_Purple = 'purple.thumbnail.jpg',
  Board_Purple_Diag = 'purple-diag.thumbnail.png',
  Board_Wood = 'wood.thumbnail.jpg',
  Board_Wood2 = 'wood2.thumbnail.jpg',
  Board_Wood3 = 'wood3.thumbnail.jpg',
  Board_Wood4 = 'wood4.thumbnail.jpg'
}

export enum Pieces {
  Piece_Alpha = 'alpha',
  Piece_Anarcandy = 'anarcandy',
  Piece_Caliente = 'caliente',
  Piece_California = 'california',
  Piece_Cardinal = 'cardinal',
  Piece_Cburnett = 'cburnett',
  Piece_Celtic = 'celtic',
  Piece_Chess7 = 'chess7',
  Piece_Chessnut = 'chessnut',
  Piece_Companion = 'companion',
  Piece_Cooke = 'cooke',
  Piece_Disguised = 'disguised',
  Piece_Dubrovny = 'dubrovny',
  Piece_Fantasy = 'fantasy',
  Piece_Fresca = 'fresca',
  Piece_Gioco = 'gioco',
  Piece_Governor = 'governor',
  Piece_Horsey = 'horsey',
  Piece_Icpieces = 'icpieces',
  Piece_Kiwensuwi = 'kiwen-suwi',
  Piece_Kosal = 'kosal',
  Piece_Leipzig = 'leipzig',
  Piece_Letter = 'letter',
  Piece_Maestro = 'maestro',
  Piece_Merida = 'merida',
  Piece_Monarchy = 'monarchy',
  Piece_Mono = 'mono',
  Piece_Mpchess = 'mpchess',
  Piece_Pirouetti = 'pirouetti',
  Piece_Pixel = 'pixel',
  Piece_Reillycraig = 'reillycraig',
  Piece_Riohacha = 'riohacha',
  Piece_Shapes = 'shapes',
  Piece_Spatial = 'spatial',
  Piece_Staunty = 'staunty',
  Piece_Tatiana = 'tatiana'
}
