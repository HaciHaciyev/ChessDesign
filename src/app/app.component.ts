import {Component, signal, WritableSignal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Entrance} from './features/entrance/entrance.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Entrance, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  showEntrance: WritableSignal<boolean> = signal(false);

  toggleEntrance() {
    this.showEntrance.set(!this.showEntrance);
  }
}
