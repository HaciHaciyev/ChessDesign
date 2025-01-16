import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {ProfileComponent} from './profile/profile.component';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    ProfileComponent,
    NgClass
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  protected isMenuOpen: boolean = false;

  toggleMenu(): void  {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
