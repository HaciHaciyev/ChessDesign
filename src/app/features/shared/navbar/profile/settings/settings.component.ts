import { Component } from '@angular/core';
import {Board, Pieces, StorageService} from '../../../service/StorageService';
import {UserProperties} from '../IUserProperties';
import {UserPropertiesService} from '../../../service/UserPropertiesService';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  protected userProperties?: UserProperties;
  protected selectedTab: string = "profile";
  protected selectedBoard?: Board;
  protected selectedPieces?: Pieces;
  boards: Board[] = Object.values(Board);
  pieces: Pieces[] = Object.values(Pieces);

  constructor(private storageService: StorageService,
              private userService: UserPropertiesService) {
    this.userService
      .getUserProperties()
      .subscribe({
        next: (userProperties: UserProperties): void => {
          this.userProperties = userProperties;
        },
        error: (): void => {
          console.error("Error loading user properties");
        }
      })
  }

  setBoard(board: Board): void {
    this.selectedBoard = board;
    this.storageService.setBoard(board);
  }

  setPieces(pieces: Pieces): void {
    this.selectedPieces = pieces;
    this.storageService.setPieces(pieces);
  }
}
