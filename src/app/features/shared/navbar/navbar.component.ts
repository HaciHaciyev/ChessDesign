import {Component, HostListener} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ProfileComponent} from './profile/profile.component';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    ProfileComponent,
    NgClass,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  protected isMenuOpen: boolean = false;
  protected isMenuToggleVisible: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.isMenuToggleVisible = window.innerWidth <= 749;
  }

  ngOnInit(): void {
    this.isMenuToggleVisible = window.innerWidth <= 749;
  }

  toggleMenu(): void  {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
