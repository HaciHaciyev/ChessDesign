import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {ProfileComponent} from './profile/profile.component';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    ProfileComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
